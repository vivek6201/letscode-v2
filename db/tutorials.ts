import prisma from "@/lib/db";
import { ContentType } from "@prisma/client";

export interface Content {
  id: number;
  type: ContentType;
  title: string;
  description: string | null;
  hidden: boolean;
  isPublished: boolean;
  thumbnail: string | null;
  topicMetadataId: number | null;
  sortingOrder: number;
}

export const getTutorial = async (id: string) => {
  if (!id) return null;

  const tutorial = await prisma.tutorials.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!tutorial) return null;

  return tutorial;
};

export const getAllTutorialTopic = async (): Promise<Content[]> => {
  //TODO: return cached data if present

  const topics = await prisma.content.findMany({
    where: {
      type: "Content",
      hidden: false,
    },
  });

  //set data to cache
  return topics;
};

export const getAllContent = async (): Promise<
  {
    id: number;
    type: ContentType;
    title: string;
    description: string | null;
    thumbnail: string | null;
    parentId: number | null;
    createdAt: Date;
    topicMetadata: {
      slug: string;
      metaTitle: string;
      metaDescription: string;
    } | null;
  }[]
> => {
  //TODO: return cached data if present
  const content = await prisma.content.findMany({
    where: {
      hidden: false,
    },
    include: {
      topicMetadata: {
        select: {
          metaDescription: true,
          slug: true,
          metaTitle: true,
        },
      },
    },
  });

  //set data to cache

  return content;
};

interface ContentWithMetadata {
  id: number;
  type: ContentType;
  title: string;
  description: string | null;
  thumbnail: string | null;
  parentId: number | null;
  createdAt: Date;
  topicMetadata?: {
    slug: string;
    metaTitle: string;
    metaDescripion: string;
  } | null;
}

export async function getRootCourseContent(tutorialsId: number): Promise<
  {
    content: ContentWithMetadata;
  }[]
> {
  // TODO: return cached data later
  const courseContent = await prisma.tutorialContent.findMany({
    orderBy: [
      {
        contentId: "asc",
      },
    ],
    where: {
      tutorialsId,
    },
    include: { content: true },
  });

  //TODO: setCache with result;

  return courseContent;
}

const getTopicMetadata = async (contentId: number) => {
  const topicMetadata = await prisma.topicMetadata.findUnique({
    where: {
      contentId,
    },
  });

  return topicMetadata;
};

export type TopicMetadata = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
};

export type ChildTutorialContent = {
  topicMetadata: TopicMetadata | null;
} & ContentWithMetadata;

export type FullTutorialContent = {
  children?: ChildTutorialContent[];
  topicMetadata: TopicMetadata | null;
} & ContentWithMetadata;

export const getFullTutorialData = async (
  tutorialsId: number
): Promise<FullTutorialContent[]> => {
  const allContent = await getAllContent();
  const tutorialContent = await getRootCourseContent(tutorialsId);
  // const topicMetadata = await getTopicMetadata()
  const contentMap = new Map<number, FullTutorialContent>(
    allContent.map((content: any) => [
      content.id,
      {
        ...content,
        children: [],
        topicMetadata: content.topicMetadata,
      },
    ])
  );

  const rootContent: FullTutorialContent[] = [];

  allContent
    .sort((a, b) => (a.id < b.id ? -1 : 1))
    .forEach((content) => {
      if (content.parentId) {
        contentMap
          .get(content.parentId)
          ?.children?.push(contentMap.get(content.id)!);
      } else if (tutorialContent.find((x) => x.content.id === content.id)) {
        rootContent.push(contentMap.get(content.id)!);
      }
    });

  return rootContent;
};
