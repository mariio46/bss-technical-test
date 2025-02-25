type User = {
    first_name: string;
    username: string;
    is_staff: boolean;
    id: number;
    language: string;
    email_notification_frequency: string;
    email_verified: boolean;
    completed_onboarding: boolean;
};

export type { User };
