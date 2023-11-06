export type Token = {
  expires_at: string;
  token: string;
  type: "Bearer";
};

export interface User {
  id: string;
  email: string;
  role: "Admin" | "User";
  is_authorized: boolean;
  authorized_until: string;
}

export interface ImageUTDResponse {
  id: number;
  data: {
    graphicInfo: {
      displayName: string;
      imageKey: string;
      id: string;
      type: string;
      title: string;
    };
    imageHtml: string;
    relatedGraphics: {
      imageKey: string;
      title: string;
      type: string;
    }[];
    slug: string;
  };
}

export interface PromotionalCode {
  slug: string;
  id: number;
  can_be_used: number;
  discount: number;
}
