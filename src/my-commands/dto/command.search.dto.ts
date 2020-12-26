export class CommandSearchDto {
  description: string;
  platform?: string;
  constructor(description: string = '', platform: string) {
    this.description = description;
    this.platform = platform;
  }
}
