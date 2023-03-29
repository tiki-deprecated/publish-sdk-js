interface LicenseRecord {
    id: string;
    title: TitleRecord;
    uses: Array<LicenseUse>;
    terms: string;
    description?: string;
    expiry?: Date;
}
