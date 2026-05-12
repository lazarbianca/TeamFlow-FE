export interface SharedFile {
    id: string;
    name: string;
    size: string;
    type: 'pdf' | 'image' | 'doc' | 'code' | 'archive' | 'other';
    uploadedBy: string;
    uploadDate: string;
}