export interface unit{
  title:string;
  status:string;
  description:string;
  rooms:number;
  bathroom:number;
  price:number;
  area:number;
  Location:string;
  locationText:string;
  imgPath:string;
}
export interface projectCategory{
  title:string;
  imgPath:string;
  url:string;
  date?:string;
}
export interface Media{
  title:string;
  imgPath:string;
  MediaType:string;
  url:string
  detailContent:string;
  LinkYoutube:string;
  date:string;
}
export interface City{
  id:number;
  name:string;
  imageName:string;
}
export interface AddCity{
  Title:string;
  image:File;
}
export interface EditCity{
  Title:string;
  image?:File|null;
}
export interface AllAreaDTO {
  id: number;
  city: string;
  viewAreas: ViewAreaDTO[];
}

export interface ViewAreaDTO {
  id: number;
  name: string;
  imageName: string;
  city?:City;
}
export interface AddArea{
  CityId: number;
  Name: string;
  Image: File;
}
export interface EditArea{
  CityId: number;
  Name: string;
  Image: File|null;
}
export interface Area{
  cityId: number;
  id:number
  name: string;
  imageName: string;
}
export interface AllProjectDTO {
  id: number;
  areaName: string;
  viewProject: ViewProjectDTO[];
}
export interface ViewProject {
  id: number;
  title: string;
  imageName: string;
}
export interface ViewProjectDTO {
  id: number;
  name: string;
  imageName: string;
}
export interface ProjectDTO {
  title: string;
  aboutProject: string;
  videoUrl: string;
  advantageProjects: AdvantageProjectDTO[];   
  locationProjects: LocationProjectDTO[];  
  mainImage: File | null;
  pdfFile: File | null;
  locationImage: File | null;
  isFinish:boolean; 
  detailImage: File[];   
  areaId: number; 
}
export interface AdvantageProjectDTO {
  text: string; 
  image: File | null; 
}
export interface AdvantageProject {
  id:number
  text: string; 
  imageUrl:string; 
}
export interface AdvantageUpdateProject {
  id:number
  text: string; 
  image:File; 
}
export interface LocationProjectDTO {
  time: number; 
  street: string; 
}
export interface LocationProject {
  id:number;
  time: number; 
  nameOfStreet: string; 
}
export interface ViewUpdateDTO {
  title: string;
  aboutProject: string;
  videoURL: string;
  mainImage: string; 
  isFinish:boolean;
  pdfFile:string;
  locationImage: string; 
  locationProjects: LocationProject[];
  advantageProjects: AdvantageProject[];
  images: string[];
}
export interface ProjectUpdateDto{
  projectId:number;
  title: string;
  aboutProject: string;
  videoURL: string;
  isFinish:boolean;
  mainImage: File|null; 
  pdfFile: File|null; 
  locationImage:  File|null;
  locationProjects: LocationProject[];
  advantageProjects: AdvantageUpdateProject[];
  locationRemoveList:Array<number>;
  advantageRemoveList:Array<number>;
  detailImage: File[];   
  ListRemovedImage:Array<string>;
}
export interface ImageDTO{
  image:File;
  text : string;
}


export interface Units {
  id: number;
  title: string;
  description: string;
  imageName: string;
  status: string;
  latitude:number;
  longitude:number;
  nameLocation:string;
  typePrice:string;
  codeUnit: string;
  area: number;
  isShown:boolean;
  numberBathroom: number;
  numberRoom: number;
  yearOfBuild: number;
  price: number;
  videoUrl: string;
}
export interface AddUnitsDTO {
  projectId: number;
  title: string;
  description: string;
  latitude:number;
  Longitude:number;
  nameLocation:string;
  typePrice:string;
  isShown:boolean;
  image: File;
  status: 'Available' | 'Sold';
  codeUnit: string;
  area: number;
  numberBathroom: number;
  numberRoom: number;
  yearOfBuild: number;
  price: number;
  videoUrl: string;
  detailImage: File[];  
  advantage: string[];  
  services: string[];   
}

export interface UnitImage {
  id:number;
  imageName: string;
}




export interface ShowUnitsDTO {
  id: number;
  title: string;
  description: string;
  imageName: string;
  latitude:number;
  longitude:number;
  isShown:boolean;
  nameLocation:string;
  typePrice:string;
  status: string;
  codeUnit: string;
  area: number;
  numberBathroom: number;
  numberRoom: number;
  yearOfBuild: number;
  price: number;
  videoUrl: string;
  projectId: number;
  advantageUnits: AdvantageUnit[];
  serviceUnits: ServiceUnit[];
  unitImages: UnitImage[];
}
export interface ServiceUnit {
  id: number;
  text: string;
}

export interface AdvantageUnit {
  id: number;
  text: string;
}
export interface UpdateUnitsDTO {
  id: number;
  title: string;
  description: string;
  image: File | null;
  status: string;
  codeUnit: string;
  area: number;
  numberBathroom: number;
  isShown:boolean;
  numberRoom: number;
  yearOfBuild: number;
  price: number;
  latitude:number;
  Longitude:number;
  nameLocation:string;
  typePrice:string;
  videoUrl: string;
  projectId: number;
  advantageUnits: AdvantageUnit[];
  serviceUnits: ServiceUnit[];
  unitImages: UnitImageDTO[];
  AllRemovedAdvantage:Array<number>;
  AllRemovedServices:Array<Number>;
  AllRemovedImages:Array<Number>;
}
export interface UnitImageDTO {
  id:number;
  image: File;
}
export interface MediaCategory {
  id: number;
  title: string;
  imageName: string;
}
export interface UpdateMediaCategory{
  id: number;
  title: string;
  image:File|null;
}
export interface AddMediaCategory {
  title: string;
  image: File;
}
export interface MediaCategoryDto {
  title: string;
  imageName: string;
}
export interface MediaImage{
  id:number;
  imageName:string;
}
export interface MediaDTO {
  id?: number;
  title: string;
  description: string;
  created: Date; 
  imageName?: string; 
  videoUrl: string; 
  videoURl: string; 
  mediaId: number;
  image?: File; 
  detailImages?: File[];
  AllRemovedImages?:Array<number>; 
}
export interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  project: string;
  message: string;
}

export interface Slider{
  id:number,
  mediaPath:string,
  mediaType:string,
}

export interface FinishItemDTO {
  id?: number; // Corresponds to nullable int in C#
  title: string;
  description: string;
  imageName?: string; // Corresponds to nullable string in C#
  image?: File; // Angular uses File type for single file uploads

  latitude: number;
  longitude: number;
  nameLocation: string;
  videoUrl: string;
  finishCategoryId: number;
  detailImage?: File[]; // For multiple file uploads, an array of File is used

  allRemovedImages?: number[]; // Corresponds to List<int> in C#
}
export interface FinishCategoryDTO {
  id?: number; // Corresponds to nullable int in C#
  title: string;
  imageName?: string; // Corresponds to nullable string in C#
  image?: File | null; // Angular uses File type for file uploads
}
export interface FinishItem {
  id: number;
  title: string;
  description: string;
  imageName: string;
  latitude: number;
  longitude: number;
  nameLocation: string;
  videoUrl: string;
  finishCategoryId: number;
}
export interface FinishImage {
  id: number;
  imageName: string;
  finishItemId: number;
  finishItem: FinishItem;
}
export interface FinishItemDetailDTO {
  finishItem: FinishItem;
  finishImages: FinishImage[];
}
export interface CityWithArea{
  city:City;
  areas:Area[];
}
export interface CoverImage {
  id: number;
  imageName: string;
  imageType: string;
  pageName: string;
}
export interface PageSection{
  id:number;
  text:string;
  imageUrl:string;
  imageFile:File;
}