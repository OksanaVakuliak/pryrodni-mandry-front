export interface UpdateProfilePayload {
  name?: string;
  password?: string;
}

export interface UpdateAvatarResponse {
  avatarUrl: string;
}

export interface UpdateRequestResponse {
  message: string;
}
