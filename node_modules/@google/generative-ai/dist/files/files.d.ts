/**
 * Details object that may be included in an error response.
 * @public
 */
export declare interface ErrorDetails {
    "@type"?: string;
    reason?: string;
    domain?: string;
    metadata?: Record<string, unknown>;
    [key: string]: unknown;
}

/**
 * Metadata to provide alongside a file upload
 * @public
 */
export declare interface FileMetadata {
    name?: string;
    displayName?: string;
    mimeType: string;
}

/**
 * File metadata response from server.
 * @public
 */
export declare interface FileMetadataResponse {
    name: string;
    displayName?: string;
    mimeType: string;
    sizeBytes: string;
    createTime: string;
    updateTime: string;
    expirationTime: string;
    sha256Hash: string;
    uri: string;
    state: FileState;
    /**
     * Error populated if file processing has failed.
     */
    error?: RpcStatus;
    /**
     * Video metadata populated after processing is complete.
     */
    videoMetadata?: VideoMetadata;
}

/**
 * Processing state of the `File`.
 * @public
 */
export declare enum FileState {
    STATE_UNSPECIFIED = "STATE_UNSPECIFIED",
    PROCESSING = "PROCESSING",
    ACTIVE = "ACTIVE",
    FAILED = "FAILED"
}

/**
 * Class for managing GoogleAI file uploads.
 * @public
 */
export declare class GoogleAIFileManager {
    apiKey: string;
    private _requestOptions?;
    constructor(apiKey: string, _requestOptions?: RequestOptions);
    /**
     * Upload a file
     */
    uploadFile(filePath: string, fileMetadata: FileMetadata): Promise<UploadFileResponse>;
    /**
     * List all uploaded files
     */
    listFiles(listParams?: ListParams): Promise<ListFilesResponse>;
    /**
     * Get metadata for file with given ID
     */
    getFile(fileId: string): Promise<FileMetadataResponse>;
    /**
     * Delete file with given ID
     */
    deleteFile(fileId: string): Promise<void>;
}

/**
 * Response from calling {@link GoogleAIFileManager.listFiles}
 * @public
 */
export declare interface ListFilesResponse {
    files: FileMetadataResponse[];
    nextPageToken?: string;
}

/**
 * Params to pass to {@link GoogleAIFileManager.listFiles}
 * @public
 */
export declare interface ListParams {
    pageSize?: number;
    pageToken?: string;
}

/**
 * Params passed to getGenerativeModel() or GoogleAIFileManager().
 * @public
 */
export declare interface RequestOptions {
    /**
     * Request timeout in milliseconds.
     */
    timeout?: number;
    /**
     * Version of API endpoint to call (e.g. "v1" or "v1beta"). If not specified,
     * defaults to latest stable version.
     */
    apiVersion?: string;
    /**
     * Additional attribution information to include in the x-goog-api-client header.
     * Used by wrapper SDKs.
     */
    apiClient?: string;
    /**
     * Base endpoint url. Defaults to "https://generativelanguage.googleapis.com"
     */
    baseUrl?: string;
    /**
     * Custom HTTP request headers.
     */
    customHeaders?: Headers | Record<string, string>;
}

/**
 * Standard RPC error status object.
 * @public
 */
export declare interface RpcStatus {
    /**
     * Error status code
     */
    code: number;
    /**
     * A developer-facing error message.
     */
    message: string;
    /**
     * A list of messages that carry the error details.
     */
    details?: ErrorDetails[];
}

/**
 * Response from calling {@link GoogleAIFileManager.uploadFile}
 * @public
 */
export declare interface UploadFileResponse {
    file: FileMetadataResponse;
}

/**
 * Metadata populated when video has been processed.
 * @public
 */
export declare interface VideoMetadata {
    /**
     * The video duration in
     * protobuf {@link https://cloud.google.com/ruby/docs/reference/google-cloud-workflows-v1/latest/Google-Protobuf-Duration#json-mapping | Duration} format.
     */
    videoDuration: string;
}

export { }
