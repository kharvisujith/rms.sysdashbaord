export interface CandidateDetails {
  candidateName: string;
  // middleName?: string;
  // lastName: string;
  email: string;
  phone: string;
}

export interface verifyCandidateRequestBody {
  id: number;
  key: string;
}

export interface submitCandidateInfoRequestBody {
  qId: number;
  confirmcode: string;
  user: CandidateDetails;
}
