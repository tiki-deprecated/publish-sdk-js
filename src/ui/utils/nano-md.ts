/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

//adapted from: https://github.com/Holixus/nano-markdown

const escapes = "\\[!]#{()}*+-._";
const esc_ofs = 16;

export async function fromSrc(src: string): Promise<string> {
  const md: string = await load(src);
  return toHtml(md);
}

export function toHtml(md: string): string {
  return md.replace(/.+(?:\n.+)*/g, function (m) {
    const code = /^\s{4}([^]*)$/.exec(m);
    if (code)
      return "<pre><code>" + code[1].replace(/\n {4}/g, "\n") + "</code></pre>";
    const ps = [];
    let cur;
    const rows = lex(m).split("\n");
    for (let i = 0, l = rows.length; i < l; ++i) {
      const row = rows[i],
        head = /^\s{0,3}(#{1,6})\s+(.*?)\s*#*\s*$/.exec(row);
      if (head) {
        // heading
        ps.push((cur = [head[2], "h", head[1].length])); // cur = [ text, type, level ]
        continue;
      }
      const list = /^(\s*)(?:[-*]|(\d[.)])) (.+)$/.exec(row);
      if (list)
        ps.push((cur = [list[3], list[2] ? "ol" : "ul", list[1].length]));
      // cur = [ text, type, level ]
      else if (/^\s{0,3}(-)(\s*\1){2,}\s*$/.test(row))
        ps.push((cur = ["", "hr"]));
      else if (cur && cur[1] !== "hr" && cur[1] !== "h") cur[0] += "\n" + row;
      else ps.push((cur = [row, "p", ""]));
    }
    let out = "";
    const lists = [];
    for (let i = 0, l = ps.length; i < l; ++i) {
      cur = ps[i];
      const text = cur[0],
        tag = cur[1],
        lvl = cur[2];
      if (tag === "ul" || tag === "ol") {
        if (!lists.length || lvl > lists[0][1]) {
          lists.unshift([tag, lvl]);
          out += "<" + lists[0][0] + "><li>" + text;
        } else if (lists.length > 1 && lvl <= lists[1][1]) {
          out += "</li></" + lists.shift()[0] + ">";
          --i;
        } else out += "</li><li>" + text;
      } else {
        while (lists.length) out += "</li></" + lists.shift()[0] + ">";
        out +=
          tag === "hr"
            ? "<hr/>"
            : "<" +
              tag +
              lvl +
              headAttrs(lvl, text) +
              ">" +
              text +
              "</" +
              tag +
              lvl +
              ">";
      }
    }
    while (lists.length) out += "</li></" + lists.shift()[0] + ">";
    return unesc(out);
  });
}

function lex(a: string): string {
  return a
    .replace(/\\([(){}[\]#*+\-.!_\\])/g, function (m, ch) {
      return String.fromCharCode(1, escapes.indexOf(ch) + esc_ofs);
    })
    .replace(/(\*\*|__|~~)(.*?)\1/g, function (m, delim, text) {
      return delim === "~~" ? "<del>" + text + "</del>" : "<b>" + text + "</b>";
    })
    .replace(/(\n|^|\W)([_*])(.*?)\2(\W|$|\n)/g, function (m, l, di, ital, r) {
      return l + "<i>" + ital + "</i>" + r;
    })
    .replace(
      /(!?)\[([^\]<>]+)]\((\+?)([^ )<>]+)(?: "([^()"]+)")?\)/g,
      function (match, is_img, text, new_tab, ref, title) {
        let attrs = title ? ' title="' + title + '"' : "";
        if (is_img)
          return (
            '<img src="' + href(ref) + '" alt="' + text + '"' + attrs + "/>"
          );
        if (new_tab) attrs += ' target="_blank" rel="noopener"';
        return '<a href="' + href(ref) + '"' + attrs + ">" + text + "</a>";
      }
    );
}

function unesc(a: string): string {
  // eslint-disable-next-line no-control-regex
  return a.replace(/\x01([\x0f-\x1c])/g, function (m, c) {
    return escapes.charAt(c.charCodeAt(0) - esc_ofs);
  });
}

function href(ref: string): string {
  return ref;
}

function headAttrs(level: string, text: string): string {
  return ""; // return ' id=\''+text.replace(/[^a-z0-9]/g, '_').replace(/_{2,}/g, '_').replace(/^_*(.*?)_*$/, '$1').toLowerCase()+'\'';
}

async function load(src: string): Promise<string> {
  const rsp: Response = await fetch(src);
  if (rsp.ok) return await rsp.text();
  return `Failed to resolve: ${src}`;
}
