export type ConnectionProfile = {
  _id: string;
  username: string;
  lastName: string;
  firstName: string;
  company: string;
  designation: string;
  headline: string;
  profileImage: string;
  industries?: string[];
};

export type Answers = {
  addInComments: string[];
  brief: string[];
  tone: string[];
  characters: string[];
};
export type Question = {
  title: string;
  options: { title: string; value: string }[];
  value: keyof Answers;
  isCheckBox: boolean;
  minSelect: number;
};

export type PostData = {
  postUrn: string;
  postText: string | null;
  actor: {
    name: string;
    headline: string;
    supplementaryInfo: string;
    linkedinUrl: string;
    profilePicture: string;
    occupation: string;
    firstName: string;
    username: string;
    profileUrl: string;
  };
  media: {
    video: {
      videoUrl: string;
      mediaType: string;
      width: number;
      bitRate: number;
      $type: string;
      aspectRatio: number;
      duration: number;
      thumbnail: string;
    };

    image: {
      imageUrl: string;
    };
    article: {
      link: string;
      accessibilityText: string;
      subTitleText: string;
      titleText: string;
      previewImage: string;
    };
  };
  likes: 0;
  comments: Comment[];
  commentsPresent: any[];
  postUrl: string;
  postType: 'IMAGE' | 'VIDEO' | 'ARTICLE';
  userId: string;
  alreadyCommented: boolean;
  repostDetails: { text: string };
  rePostActor: {
    name: string;
    firstName: string;
    lastName: string;
    headline: string;
    profilePicture: string;
    profileUrn: string;
    username: string;
    profileUrl: string;
    supplementaryInfo: string;
  };
};

export type Comment = {
  comment: string;
  category: string;
};
