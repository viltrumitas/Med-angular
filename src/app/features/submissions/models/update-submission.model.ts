import { SubmissionDto } from '../dto/submission.dto';

export type UpdateSubmisson = {
  [E in keyof SubmissionDto]?: SubmissionDto[E] | null;
};
