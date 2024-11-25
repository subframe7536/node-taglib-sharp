/**
 * Public enumeration listing Matroska/webm specific EBML Identifiers.
 */
export const MatroskaIds = {
    // GLOBAL --------------------------------------------------------------

    /**
     * Identifier for a Matroska Void EBML element.
     */
    VOID: 0xEC,

    /**
     * Identifier for a Matroska CRC-32 EBML element.
     * @remarks
     *     The CRC is computed on all the data of the Master-element it's in. The CRC Element
     *     should be the first in its parent master for easier reading. All level 1 Elements
     *     should include a CRC-32. The CRC in use is the IEEE CRC32 Little Endian.
     */
    CRC32: 0xBF,

    // SEGMENT -------------------------------------------------------------

    /**
     * Identifier for a Matroska Segment EBML element.
     */
    SEGMENT: 0x18538067,


    // META SEEK -----------------------------------------------------------

    /**
     * Identifier for a Matroska Seek Head EBML element.
     */
    SEEK_HEAD: 0x114D9B74,

    /**
     * Identifier for a Matroska Seek Entry (Master).
     */
    SEEK: 0x4DBB,

    /**
     * Identifier for a Matroska Seek ID (Binary).
     */
    SEEK_ID: 0x53AB,

    /**
     * Identifier for a Matroska Seek Position (uint).
     */
    SEEK_POSITION: 0x53AC,

    // SEGMENT INFO --------------------------------------------------------

    /**
     * Identifier for a Matroska Segment Info EBML element.
     */
    INFO: 0x1549A966,

    /**
     * Identifier for a Matroska Segment UUID EBML element.
     */
    SEGMENT_UUID: 0x73A4,

    /**
     * Identifier for a Matroska Segment File Name EBML element.
     */
    SEGMENT_FILE_NAME: 0x7384,

    /**
     * Identifier for a Matroska Prev UUID EBML element.
     */
    PREV_UUID: 0x3CB923,

    /**
     * Identifier for a Matroska Prev File Name EBML element.
     */
    PREV_FILE_NAME: 0x3C83AB,

    /**
     * Identifier for a Matroska Nex UUID EBML element.
     */
    NEXT_UUID: 0x3EB923,

    /**
     * Identifier for a Matroska Nex File Name EBML element.
     */
    NEXT_FILE_NAME: 0x3E83BB,

    /**
     * Identifier for a Matroska Segment Family EBML element.
     */
    SEGMENT_FAMILY: 0x4444,

    /**
     * Identifier for a Matroska Chapter Translate EBML element.
     */
    CHAPTER_TRANSLATE: 0x6924,

    /**
     * Identifier for a Matroska Chapter Translate ID element.
     */
    CHAPTER_TRANSLATE_ID: 0x69A5,

    /**
     * Identifier for a Matroska Chapter Translate Codec element.
     */
    CHAPTER_TRANSLATE_CODEC: 0x69BF,

    /**
     * Identifier for a Matroska Chapter Translate Edition UID element.
     */
    CHAPTER_TRANSLATE_EDITION_UID: 0x69FC,

    /**
     * Identifier for a Matroska Code Scale EBML element.
     */
    TIME_CODE_SCALE: 0x2AD7B1,

    /**
     * Identifier for a Matroska Duration EBML element.
     */
    DURATION: 0x4489,

    /**
     * Identifier for a Matroska Date UTC EBML element.
     */
    DATE_UTC: 0x4461,

    /**
     * Identifier for a Matroska Title EBML element.
     */
    TITLE: 0x7BA9,

    /**
     * Identifier for a Matroska Muxing App EBML element.
     */
    MUXING_APP: 0x4D80,

    /**
     * Identifier for a Matroska Writing App EBML element.
     */
    WRITTING_APP: 0x5741,

    // CLUSTER -------------------------------------------------------------

    /**
     * Identifier for a Matroska Cluster EBML element.
     */
    CLUSTER: 0x1F43B675,

    /**
     * Identifier for a Matroska Timestamp element.
     */
    TIMESTAMP: 0xE7,

    /**
     * Identifier for a Matroska Silent Tracks element (deprecated).
     */
    SILENT_TRACKS: 0x5854,

    /**
     * Identifier for a Matroska Silent Track Number element (deprecated).
     */
    SILENT_TRACK_NUMBER: 0x58D7,

    /**
     * Identifier for a Matroska cluster position element.
     */
    POSITION: 0xA7,

    /**
     * Identifier for a Matroska previous cluster size element.
     */
    PREV_SIZE: 0xAB,

    /**
     * Identifier for a Matroska Simple Block element.
     */
    SIMPLE_BLOCK: 0xA3,

    /**
     * Identifier for a Matroska Block Group element.
     */
    BLOCK_GROUP: 0xA0,

    /**
     * Identifier for a Matroska Block element.
     */
    BLOCK: 0xA1,

    /**
     * Identifier for a Matroaka virtual block element (deprecated).
     */
    BLOCK_VIRTUAL: 0xA2,

    /**
     * Identifier for a Matroska block additions element.
     */
    BLOCK_ADDITIONS: 0x75A1,

    /**
     * Identifier for a Matroska block's additional properties element.
     */
    BLOCK_MORE: 0xA6,

    /**
     * Identifier for additional block information Matroska element.
     */
    BLOCK_ADDITIONAL: 0xA5,

    /**
     * Identifier for ID that identifies the additional block information element.
     */
    BLOCK_ADD_ID: 0xEE,

    /**
     * Identifier for a block duration Matroska element.
     */
    BLOCK_DURATION: 0x9B,

    /**
     * Identifier for a Matroska reference priority element.
     */
    REFERENCE_PRIORITY: 0xFA,

    /**
     * Identifier for a Matroska reference block element.
     */
    REFERENCE_BLOCK: 0xFB,

    /**
     * Identifier for a Matroska virtual reference element (deprecated).
     */
    REFERENCE_VIRTUAL: 0xFD,

    /**
     * Identifier for a Matroska codec state element.
     */
    CODEC_STATE: 0xA4,

    /**
     * Identifier for a Matroska padding discarding element.
     */
    DISCARD_PADDING: 0x75A2,

    /**
     * Identifier for a Matroska slices element (deprecated).
     */
    SLICES: 0x8E,

    /**
     * Identifier for a Matroska time slice element (deprecated).
     */
    TIME_SLICE: 0xE8,

    /**
     * Identifier a a Matroska lace number element (deprecated).
     */
    LACE_NUMBER: 0xCC,

    /**
     * Identifier for a Matroska frame number element (deprecated).
     */
    FRAME_NUMBER: 0xCD,

    /**
     * Identifier for a Matroska block addition ID element (not to be confused with
     * {@link BLOCK_ADD_ID}, deprecated).
     */
    BLOCK_ADDITION_ID: 0xCB,

    /**
     * Identifier for a Matroska delay element (deprecated).
     */
    DELAY: 0xCE,

    /**
     * Identifier for a Matroska slice duration element (deprecated).
     */
    SLICE_DURATION: 0xCF,

    /**
     * Identifier for a Matroska reference frame element (deprecated).
     */
    REFERENCE_FRAME: 0xC8,

    /**
     * Identifier for a Matroska reference offset element (deprecated).
     */
    REFERENCE_OFFSET: 0xC9,

    /**
     * Identifier for a Matroska reference timestamp element (deprecated).
     */
    REFERENCE_TIMESTAMP: 0xCA,

    /**
     * Identifier for a Matroska encrypted block element (deprecated).
     */
    ENCRYPTED_BLOCK: 0xAF,

    // TRACK ---------------------------------------------------------------

    /**
     * Identifier for a Matroska Tracks EBML Element.
     */
    TRACKS: 0x1654AE6B,

    /**
     * Identifier for a Matroska Track Entry EBML element.
     */
    TRACK_ENTRY: 0xAE,

    /**
     * Identifier for a Matroska Track Number EBML element.
     */
    TRACK_NUMBER: 0xD7,

    /**
     * Identifier for a Matroska Track UID EBML element.
     */
    TRACK_UID: 0x73C5,

    /**
     * Identifier for a Matroska Track Type EBML element.
     */
    TRACK_TYPE: 0x83,

    /**
     * Identifier for a Matroska Track Enabled EBML element.
     */
    FLAG_ENABLED: 0xB9,

    /**
     * Identifier for a Matroska Track Flag Default EBML element.
     */
    FLAG_DEFAULT: 0x88,

    /**
     * Identifier for a Matroska Track Flag Forced EBML element.
     */
    FLAG_FORCED: 0x55AA,

    /**
     * Identifier for a Matroska Track Flag Hearing Impaired EBML element.
     */
    FLAG_HEARING_IMPAIRED: 0x55AB,

    /**
     * Identifier for a Matroska Track Flag Visual Impaired EBML element.
     */
    FLAG_VISUAL_IMPAIRED: 0x55AC,

    /**
     * Identifier for a Matroska text descriptions flag element.
     */
    FLAG_TEXT_DESCRIPTIONS: 0x55AD,

    /**
     * Identifier for a Matroska Track Flag Original EBML element.
     */
    FLAG_ORIGINAL: 0x55AE,

    /**
     * Identifier for a Matroska Track Flag Commentary element.
     */
    FLAG_COMMENTARY: 0x55AF,

    /**
     * Identifier for a Matroska Track Flag Lacing EBML element.
     */
    FLAG_LACING: 0x9C,

    /**
     * Identifier for a Matroska Track Min Cache EBML element.
     */
    MIN_CACHE: 0x6DE7,

    /**
     * Identifier for a Matroska Track Max Cache EBML element.
     */
    MAX_CACHE: 0x6DF8,

    /**
     * Identifier for a Matroska Track Default Duration EBML element.
     */
    DEFAULT_DURATION: 0x23E383,

    /**
     * Identifier for a Matroska default decoded field duration.
     */
    DEFAULT_DECODED_FIELD_DURATION: 0x234E7A,

    /**
     * Identifier for a Matroska Track Time Code Scale EBML element (deprecated).
     */
    TRACK_TIMESTAMP_SCALE: 0x23314F,

    /**
     * Identifier for a Matroska Track Offset element (deprecated).
     */
    TRACK_OFFSET: 0x537F,

    /**
     * Identifier for a Matroska Track Max Block Addition EBML element.
     */
    MAX_BLOCK_ADDITION_ID: 0x55EE,

    /**
     * Identifier for a Matroska block addition mapping.
     */
    BLOCK_ADDITION_MAPPING: 0x41E4,

    /**
     * Identifier for a Matroska block additional ID value element.
     */
    BLOCK_ADD_ID_VALUE: 0x41F0,

    /**
     * Identifier for a Matroska block additional ID name element.
     */
    BLOCK_ADD_ID_NAME: 0x41A4,

    /**
     * Identifier for a Matroska block additional ID type element.
     */
    BLOCK_ADD_ID_TYPE: 0x41E7,

    /**
     * Identifier for a Matroska block additional ID extra data element.
     */
    BLOCK_ADD_ID_EXTRA_DATA: 0x41ED,

    /**
     * Identifier for a Matroska Track Name EBML element.
     */
    NAME: 0x536E,

    /**
     * Identifier for a Matroska Track Language EBML element.
     */
    LANGUAGE: 0x22B59C,

    /**
     * Identifier for a Matroska Language BCP47 element.
     */
    LANGUAGE_BCP47: 0x22B59D,

    /**
     * Identifier for a Matroska Codec ID EBML element.
     */
    CODEC_ID: 0x86,

    /**
     * Identifier for a Matroska Codec Private EBML element.
     */
    CODEC_PRIVATE: 0x63A2,

    /**
     * Identifier for a Matroska Codec Name EBML element.
     */
    CODEC_NAME: 0x258688,

    /**
     * Identifier for a Matroska Track Attachment Link EBML element (deprecated).
     */
    ATTACHMENT_LINK: 0x7446,

    /**
     * Identifier for a Matroska Codec Settings EBML element (deprecated).
     */
    CODEC_SETTINGS: 0x3A9697,

    /**
     * Identifier for a Matroska Codec Info URL EBML element (deprecated).
     */
    CODEC_INFO_URL: 0x3B4040,

    /**
     * Identifier for a Matroska Codec Download URL EBML element (deprecated).
     */
    CODEC_DOWNLOAD_URL: 0x26B240,

    /**
     * Identifier for a Matroska Codec Decode All EBML element (deprecated).
     */
    CODEC_DECODE_ALL: 0xAA,

    /**
     * Identifier for a Matroska Track Overlay EBML element.
     */
    TRACK_OVERLAY: 0x6FAB,

    /**
     * Identifier for a Matroska codec delay element.
     */
    CODEC_DELAY: 0x56AA,

    /**
     * Identifier for a Matroska seek preroll element.
     */
    SEEK_PREROLL: 0x56BB,

    /**
     * Identifier for a Matroska Track Translate EBML element.
     */
    TRACK_TRANSLATE: 0x6624,

    /**
     * Identifier for a Matroska track translate track ID element.
     */
    TRACK_TRANSLATE_TRACK_ID: 0x66A5,

    /**
     * Identifier for a Matroska track translate codec element.
     */
    TRACK_TRANSLATE_CODEC: 0x66BF,

    /**
     * Identifier for a Matroska track translate edition UID.
     */
    TRACK_TRANSLATE_EDITION_UID: 0x66FC,

    /**
     * Identifier for a Matroska Track Video EBML element.
     */
    VIDEO: 0xE0,

    /**
     * Identifier for a Matroska Video Flag Interlaced EBML element.
     */
    FLAG_INTERLACED: 0x9A,

    /**
     * Identifier for a Matroska video field older element.
     */
    FIELD_ORDER: 0x9D,

    /**
     * Identifier for a Matroska Video Stereo Mode EBML element.
     */
    STEREO_MODE: 0x53B8,

    /**
     * Identifier for a Matroska alpha mode element.
     */
    ALPHA_MODE: 0x53C0,

    /**
     * Identifier for a Matroska old (pre-libmatroska 0.9.0) stereo mode element.
     */
    OLD_STEREO_MODE: 0x53B9,

    /**
     * Identifier for a Matroska Video Pixel Width EBML element.
     */
    PIXEL_WIDTH: 0xB0,

    /**
     * Identifier for a Matroska Video Pixel Height EBML element.
     */
    PIXEL_HEIGHT: 0xBA,

    /**
     * Identifier for a Matroska Video Pixel Crop Bottom EBML element.
     */
    PIXEL_CROP_BOTTOM: 0x54AA,

    /**
     * Identifier for a Matroska Video Pixel Crop Top EBML element.
     */
    PIXEL_CROP_TOP: 0x54BB,

    /**
     * Identifier for a Matroska Video Pixel Crop Left EBML element.
     */
    PIXEL_CROP_LEFT: 0x54CC,

    /**
     * Identifier for a Matroska Video Pixel Crop Right EBML element.
     */
    PIXEL_CROP_RIGHT: 0x54DD,

    /**
     * Identifier for a Matroska Video Display Width EBML element.
     */
    DISPLAY_WIDTH: 0x54B0,

    /**
     * Identifier for a Matroska Video Display Height EBML element.
     */
    DISPLAY_HEIGHT: 0x54BA,

    /**
     * Identifier for a Matroska Video Display Unit EBML element.
     */
    DISPLAY_UNIT: 0x54B2,

    /**
     * Identifier for a Matroska Video Aspect Ratio Type EBML element (deprecated).
     */
    ASPECT_RATIO_TYPE: 0x54B3,

    /**
     * Identifier for a Matroska video uncompressed fourcc element (color space).
     */
    UNCOMPRESSED_FOURCC: 0x2EB524,

    /**
     * Identifier for a Matroska Video Gamma Value EBML element (deprecated).
     */
    GAMMA_VALUE: 0x2FB523,

    /**
     * Identifier for a Matroska Video Frame Rate EBML element (deprecated).
     */
    FRAME_RATE: 0x2383E3,

    /**
     * Identifier for a Matroska video colour format element.
     */
    COLOUR: 0x55B0,

    /**
     * Identifier for a Matroska matrix coefficients element.
     */
    MATRIX_COEFFICIENTS: 0x55B1,

    /**
     * Identifier for a Matroska video bits per channel element.
     */
    BITS_PER_CHANNEL: 0x55B2,

    /**
     * Identifier for a Matroska horizontal Cr/Cb subsampling.
     */
    CHROMA_SUBSAMPLING_HORZ: 0x55B3,

    /**
     * Identifier for a Matroska vertical Cr/Cb subsampling.
     */
    CHROMA_SUBSAMPLING_VERT: 0x55B4,

    /**
     * Identifier for a Matroska horizontal Cb subsampling.
     */
    CB_SUBSAMPLING_HORZ: 0x55B5,

    /**
     * Identifier for a Matroska vertical Cb subsampling.
     */
    CB_SUBSAMPLING_VERT: 0x55B6,

    /**
     * Identifier for a Matroska horizontal chroma subsampling.
     */
    CHROMA_SITING_HORZ: 0x55B7,

    /**
     * Identifier for a Matroska vertical chroma subsampling.
     */
    CHROMA_SITING_VERT: 0x55B8,

    /**
     * Identifier for a Matroska video range element.
     */
    RANGE: 0x55B9,

    /**
     * Identifier for a Matroska video transfer characteristics element.
     */
    TRANSFER_CHARACTERISTICS: 0x55BA,

    /**
     * Identifier for a Matroska video color primaries element.
     */
    PRIMARIES: 0x55BB,

    /**
     * Identifier for a Matroska video maximum content light level element.
     */
    MAX_CLL: 0x55BC,

    /**
     * Identifier for a Matroska video frame-average light level element.
     */
    MAX_FALL: 0x55BD,

    /**
     * Identifier for a Matroska SMPTE 2086 mastering data element.
     */
    MASTERING_METADATA: 0x55D0,

    /**
     * Identifier for a Matroska red X chromaticity coordinate element.
     */
    PRIMARY_R_CHROMATICITY_X: 0x55D1,

    /**
     * Identifier for a Matroska red Y chromaticity coordinate element.
     */
    PRIMARY_R_CHROMATICITY_Y: 0x55D2,

    /**
     * Identifier for a Matroska green X chromaticity coordinate element.
     */
    PRIMARY_G_CHROMATICITY_X: 0x55D3,

    /**
     * Identifier for a Matroska green Y chromaticity coordinate element.
     */
    PRIMARY_G_CHROMATICITY_Y: 0x55D4,

    /**
     * Identifier for a Matroska blue X chromaticity coordinate element.
     */
    PRIMARY_B_CHROMATICITY_X: 0x55D5,

    /**
     * Identifier for a Matroska blue X chromaticity coordinate element.
     */
    PRIMARY_B_CHROMATICITY_Y: 0x55D6,

    /**
     * Identifier for a Matroska white X chromaticity coordinate element.
     */
    WHITE_POINT_CHROMATICITY_X: 0x55D7,

    /**
     * Identifier for a Matroska white Y chromaticity coordinate element.
     */
    WHITE_POINT_CHROMATICITY_Y: 0x55D8,

    /**
     * Identifier for a Matroska maximum luminance element.
     */
    LUMINANCE_MAX: 0x55D9,

    /**
     * Identifier for a Matroska minimum luminance element.
     */
    LUMINANCE_MIN: 0x55D9,

    /**
     * Identifier for a Matroska video projection details element.
     */
    PROJECTION: 0x7670,

    /**
     * Identifier for a Matroska video projection type element.
     */
    PROJECTION_TYPE: 0x7671,

    /**
     * Identifier for a Matroska video projection private data element.
     */
    PROJECTION_PRIVATE: 0x7672,

    /**
     * Identifier for a Matroska video projection pose yaw element.
     */
    PROJECTION_POSE_YAW: 0x7673,

    /**
     * Identifier for a Matroska video projection pose pitch element.
     */
    PROJECTION_POSE_PITCH: 0x7674,

    /**
     * Identifier for a Matroska video projection pose roll element.
     */
    PROJECTION_POSE_ROLL: 0x7675,

    /**
     * Identifier for a Matroska Track Audio EBML element.
     */
    AUDIO: 0xE1,

    /**
     * Identifier for a Matroska Audio Sampling Freq EBML element.
     */
    SAMPLING_FREQ: 0xB5,

    /**
     * Identifier for a Matroska Audio Output Sampling Freq EBML element.
     */
    OUTPUT_SAMPLING_FREQ: 0x78B5,

    /**
     * Identifier for a Matroska Audio Channels EBML element.
     */
    CHANNELS: 0x9F,

    /**
     * Identifier for a Matroska Audio Channels Position EBML element (deprecated).
     */
    CHANNELS_POSITIONS: 0x7D7B,

    /**
     * Identifier for a Matroska Audio Bit Depth EBML element.
     */
    BIT_DEPTH: 0x6264,

    /**
     * Identifier for a Matroska audio emphasis element.
     */
    EMPHASIS: 0x52F1,

    /**
     * Identifier for a Matroska track operation element.
     */
    TRACK_OPERATION: 0xE2,

    /**
     * Identifier for a Matroska video plane tracks to combine element.
     */
    TRACK_COMBINE_PLANES: 0xE3,

    /**
     * Identifier for a Matroska video plane track element.
     */
    TRACK_PLANE: 0xE4,

    /**
     * Identifier for a Matroska video plane track UID element.
     */
    TRACK_PLANE_UID: 0xE5,

    /**
     * Identifier for a Matroska video plane type element.
     */
    TRACK_PLANE_TYPE: 0xE6,

    /**
     * Identifier for a Matroska element that indicates which tracks need to be combined.
     */
    TRACK_JOIN_BLOCKS: 0xE9,

    /**
     * Identifier for a Matroska joined track UID.
     */
    TRACK_JOIN_UID: 0xED,

    /**
     * Identifier for a Matroska trick track UID element (deprecated).
     */
    TRICK_TRACK_UID: 0xC0,

    /**
     * Identifier for a Matroska trick track's segment UID element (deprecated).
     */
    TRICK_TRACK_SEGMENT_UID: 0xC1,

    /**
     * Identifier for a Matroska trick track's flag element (deprecated).
     */
    TRICK_TRACK_FLAG: 0xC6,

    /**
     * Identifier for a Matroska trick track's master track UID element (deprecated).
     */
    TRICK_MASTER_TRACK_UID: 0xC7,

    /**
     * Identifier for a Matroska trick track's master track segment UID (deprecated).
     */
    TRICK_MASTER_TRACK_SEGMENT_UID: 0xC4,

    /**
     * Identifier for a Matroska Track Encoding EBML master element.
     */
    CONTENT_ENCODINGS: 0x6D80,

    /**
     * Identifier for a Matroska track encoding element.
     */
    CONTENT_ENCODING: 0x6240,

    /**
     * Identifier for a Matroska track encoding scope element.
     */
    CONTENT_ENCODING_SCOPE: 0x5032,

    /**
     * Identifier for a Matroska track encoding type element.
     */
    CONTENT_ENCODING_TYPE: 0x5033,

    /**
     * Identifier for a Matroska track compression master element.
     */
    CONTENT_COMPRESSION: 0x5034,

    /**
     * Identifier for a Matroska track compression algorithm element.
     */
    CONTENT_COMP_ALGO: 0x4254,

    /**
     * Identifier for a Matroska track compression settings element.
     */
    CONTENT_COMP_SETTINGS: 0x4255,

    /**
     * Identifier for a Matroska track encryption master element.
     */
    CONTENT_ENCRYPTION: 0x5035,

    /**
     * Identifier for a Matroska track encryption algorithm element.
     */
    CONTENT_ENC_ALGO: 0x47E1,

    /**
     * Identifier for a Matroska track encryption key ID element.
     */
    CONTENT_ENC_KEY_ID: 0x47E2,

    /**
     * Identifier for a Matroska track AES encryption settings element.
     */
    CONTENT_ENC_AES_SETTINGS: 0x47E7,

    /**
     * Identifier for a Matroska track AES encryption cipher mode element.
     */
    AES_SETTINGS_CIPHER_MODE: 0x47E8,

    /**
     * Identifier for a Matroska track encryption content signature element (deprecated).
     */
    CONTENT_SIGNATURE: 0x47E3,

    /**
     * Identifier for a Matroska track encryption content signature ID element (deprecated).
     */
    CONTENT_SIG_KEY_ID: 0x47E4,

    /**
     * Identifier for a Matroska track encryption signature algorithm element (deprecated).
     */
    CONTENT_SIG_ALGO: 0x47E5,

    /**
     * Identifier for a Matroska track encryption signature hash algorithm element (deprecated).
     */
    CONTENT_SIG_HASH_ALGO: 0x47E6,

    // CUEING DATA ---------------------------------------------------------

    /**
     * Identifier for a Matroska Cues EBML element.
     */
    CUES: 0x1C53BB6B,

    /**
     * Identifier for a Matroska cue seek point element.
     */
    CUES_POINT: 0xBB,

    /**
     * Identifier for a Matroska cue timestamp element.
     */
    CUE_TIME: 0xB3,

    /**
     * Identifier for a Matroska cue track positions master element.
     */
    CUE_TRACK_POSITIONS: 0xB7,

    /**
     * Identifier for a Matroska cue track element.
     */
    CUE_TRACK: 0xF7,

    /**
     * Identifier for a Matroska cue cluster position element.
     */
    CUE_CLUSTER_POSITION: 0xF1,

    /**
     * Identifier for a Matroska cue relative position element.
     */
    CUE_RELATIVE_POSITION: 0xF0,

    /**
     * Identifier for a Matroska cue duration element.
     */
    CUE_DURATION: 0xB2,

    /**
     * Identifier for a Matroska cue block number element.
     */
    CUE_BLOCK_NUMBER: 0x5378,

    /**
     * Identifier for a Matroska cue codec state element.
     */
    CUE_CODEC_STATE: 0xEA,

    /**
     * Identifier for a Matroska cue reference master element.
     */
    CUE_REFERENCE: 0xDB,

    /**
     * Identifier for a Matroska cue reference time element.
     */
    CUE_REF_TIME: 0x96,

    /**
     * Identifier for a Matroska cue reference cluster element (deprecated).
     */
    CUE_REF_CLUSTER: 0x97,

    /**
     * Identifier for a Matroska cue reference number element (deprecated).
     */
    CUE_REF_NUMBER: 0x535F,

    /**
     * Identifier for a Matroska cue reference codec state element (deprecated).
     */
    CUE_REF_CODEC_STATE: 0xEB,

    // ATTACHMENT ----------------------------------------------------------

    /**
     * Identifier for a Matroska Attachments EBML element.
     */
    ATTACHMENTS: 0x1941A469,

    /**
     * Identifier for a Matroska attached file.
     */
    ATTACHED_FILE: 0x61A7,

    /**
     * Identifier for a Matroska human-friendly name for the attached file.
     */
    FILE_DESCRIPTION: 0x467E,

    /**
     * Identifier for a Matroska Filename of the attached file.
     */
    FILE_NAME: 0x466E,

    /**
     * Identifier for a Matroska MIME type of the file.
     */
    FILE_MEDIA_TYPE: 0x4660,

    /**
     * Identifier for a Matroska data of the file.
     */
    FILE_DATA: 0x465C,

    /**
     * Identifier for a Matroska Unique ID representing the file, as random as possible.
     */
    FILE_UID: 0x46AE,

    /**
     * Identifier for a Matroska attachment referral element (deprecated).
     */
    FILE_REFERRAL: 0x4675,

    /**
     * Identifier for a Matroska attachment usage start time element (deprecated).
     */
    FILE_USED_START_TIME: 0x4661,

    /**
     * Identifier for a Matroska attachment usage end time element (deprecated).
     */
    FILE_USED_END_TILE: 0x4662,

    // CHAPTERS ------------------------------------------------------------

    /**
     * Identifier for a Matroska Chapters EBML element.
     */
    CHAPTERS: 0x1043A770,

    /**
     * Identifier for a Matroska segment edition master element.
     */
    EDITION_ENTRY: 0x45B9,

    /**
     * Identifier for a Matroska edition UID element.
     */
    EDITION_UID: 0x45BC,

    /**
     * Identifier for a Matroska edition hidden flag element.
     */
    EDITION_FLAG_HIDDEN: 0x45BD,

    /**
     * Identifier for a Matroska edition default flag element.
     */
    EDITION_FLAG_DEFAULT: 0x45BD,

    /**
     * Identifier for a Matroska edition ordered flag element.
     */
    EDITION_FLAG_ORDERED: 0x45DD,

    /**
     * Identifier for a Matroska edition display element.
     */
    EDITION_DISPLAY: 0x4520,

    /**
     * Identifier for a Matroska edition display string element.
     */
    EDITION_STRING: 0x4521,

    /**
     * Identifier for a Matroska edition display string BCP47 language code element.
     */
    EDITION_LANGUAGE_BCP47: 0x45E4,

    /**
     * Identifier for a Matroska chapter atom master element.
     */
    CHAPTER_ATOM: 0xB6,

    /**
     * Identifier for a Matroska chapter UID element.
     */
    CHAPTER_UID: 0x73C4,

    /**
     * Identifier for a Matroska chapter string UID element.
     */
    CHAPTER_STRING_UID: 0x73C4,

    /**
     * Identifier for a Matroska chapter start time element.
     */
    CHAPTER_TIME_START: 0x91,

    /**
     * Identifier for a Matroska chapter end time element.
     */
    CHAPTER_TIME_END: 0x92,

    /**
     * Identifier for a Matroska chapter enabled flag element.
     */
    CHAPTER_FLAG_ENABLED: 0x4598,

    /**
     * Identifier for a Matroska chapter hidden flag element.
     */
    CHAPTER_FLAG_HIDDEN: 0x98,

    /**
     * Identifier for a Matroska chapter segment UUID element.
     */
    CHAPTER_SEGMENT_UUID: 0x6E67,

    /**
     * Identifier for a Matroska chapter skip type element.
     */
    CHAPTER_SKIP_TYPE: 0x4588,

    /**
     * Identifier for a Matroska chapter segment edition UID element.
     */
    CHAPTER_SEGMENT_EDITION_UID: 0x6EBC,

    /**
     * Identifier for a Matroska chapter physical equivalent element.
     */
    CHAPTER_PHYSICAL_EQUIV: 0x63C3,

    /**
     * Identifier for a Matroska chapter track master element.
     */
    CHAPTER_TRACK: 0x8F,

    /**
     * Identifier for a Matroska chapter track UID element.
     */
    CHAPTER_TRACK_UID: 0x89,

    /**
     * Identifier for a Matroska chapter display master element.
     */
    CHAPTER_DISPLAY: 0x80,

    /**
     * Identifier for a Matroska chapter string element.
     */
    CHAP_STRING: 0x85,

    /**
     * Identifier for a Matroska chapter language code element.
     */
    CHAP_LANGUAGE: 0x437C,

    /**
     * Identifier for a Matroska chapter BCP47 language code element.
     */
    CHAP_LANGUAGE_BCP47: 0x437D,

    /**
     * Identifier for a Matroska chapter country code element.
     */
    CHAP_COUNTRY: 0x437E,

    /**
     * Identifier for a Matroska chapter process master element.
     */
    CHAP_PROCESS: 0x6944,

    /**
     * Identifier for a Matroska chapter process codec ID element.
     */
    CHAP_PROCESS_CODEC_ID: 0x6955,

    /**
     * Identifier for a Matroska chapter process command master element.
     */
    CHAP_PROCESS_PRIVATE: 0x450D,

    /**
     * Identifier for a Matroska chapter process time element.
     */
    CHAP_PROCESS_TIME: 0x6922,

    /**
     * Identifier for a Matroska chapter process data element.
     */
    CHAP_PROCESS_DATA: 0x6933,

    // TAGGING -------------------------------------------------------------

    /**
     * Identifier for a Matroska Tags EBML element.
     */
    TAGS: 0x1254C367,

    /**
     * Identifier for a Matroska Tag EBML element.
     */
    TAG: 0x7373,

    /**
     * Identifier for a Matroska Targets EBML element.
     */
    TARGETS: 0x63C0,

    /**
     * Identifier for a Matroska Target Type Value EBML element (UINT).
     */
    TARGET_TYPE_VALUE: 0x68CA,

    /**
     * Identifier for a Matroska Target Type EBML element (string).
     */
    TARGET_TYPE: 0x63CA,

    /**
     * Identifier for a Matroska Target Tag Track UID EBML element (UINT).
     */
    TAG_TRACK_UID: 0x63C5,

    /**
     * Identifier for a Matroska Target Tag Edition UID EBML element (UINT).
     */
    TAG_EDITION_UID: 0x63C9,

    /**
     * Identifier for a Matroska Target Tag Chapter UID EBML element (UINT).
     */
    TAG_CHAPTER_UID: 0x63C4,

    /**
     * Identifier for a Matroska Target Tag Attachment UID EBML element (UINT).
     */
    TAG_ATTACHMENT_UID: 0x63C6,

    /**
     * Identifier for a Matroska Simple Tag EBML element.
     */
    SIMPLE_TAG: 0x67C8,

    /**
     * Identifier for a Matroska Tag Name EBML element.
     */
    TAG_NAME: 0x45A3,

    /**
     * Identifier for a Matroska Tag Language EBML element.
     */
    TAG_LANGUAGE: 0x447A,

    /**
     * Identifier for a Matroska Tag Language BCP47 EBML element.
     */
    TAG_LANGUAGE_BCP47: 0x447B,

    /**
     * Identifier for a Matroska Tag Default EBML element.
     */
    TAG_DEFAULT: 0x4484,

    /**
     * Identifier for a Matroska Tag Default bogus EBML element (Deprecated).
     */
    TAG_DEFAULT_BOGUS: 0x4484,

    /**
     * Identifier for a Matroska Tag String EBML element.
     */
    TAG_STRING: 0x4487,

    /**
     * Identifier for a Matroska Tag Binary EBML element.
     */
    TAG_BINARY: 0x4485,
} as const
