export type TQuoteItem = {
    slug: string;
    name?: string;
    cases: number;
}

export type TCreateFeedback = {
    name: string;
    phone: string;
    email?: string;
    subject: string;
    content: string;
    company?: string;
    businessType?: string;
    items?: TQuoteItem[];
}
