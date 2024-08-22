import Category from "./Category";

export default interface Book {
  Id?: string;
  Title: string;
  Author: string;
  Categories: Category[];
  Description: string;
  ImageUrl?: string;
  PdfUrl?: string;
  VoiceUrl?: string;
  ImageFile: File | string;
  PdfFile: File | string;
  VoiceFile: File | string;
  PublishedYear: string;
  NumberOfPages: number;
  AverageRating?: number;
  RatingsCount?: number;
  ReadingCount?: number;
}
