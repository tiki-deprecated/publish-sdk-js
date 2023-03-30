interface RspLicense {
    id: string;
    title: RspTitle;
    uses: Array<RspLicenseUse>;
    terms: string;
    description?: string;
    expiry?: number;
}
