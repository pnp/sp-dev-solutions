interface IVideoPreviewContainerProps {
    videoUrl: string;
    fileExtension :string;
    thumbnailSrc: string;
    targetElement: HTMLElement;
    showPreview: boolean;
}

export default IVideoPreviewContainerProps;