export interface Filter {
    repository?: string;
    platform?: string;
    lake?: string;
    cruise?: string;
    device?: string;
    date?: string;
    bbox?: string;
    min_depth?: number;
    max_depth?: number;
}


export interface Repository {
    id: number;
    facility: string;
    facility_code: string;
    sample_count?: number;
    facility_comment?: string;
}


export interface Cruise {
    id: number;
    cruise: string;
    year: number;
    facility_codes: string[];
    platforms: string[];
    legs?: string[];
    links: CruiseLink[];
}

export interface CruiseLink {
    LINK: string;
    LINKLEVEL: string;
    SOURCE: string;
    TYPE: string;
    objectid?: number;
}

export interface Sample {
    objectid: number;
    imlgs: string;
    facility_code: string;
    platform: string;
    cruise: string;
    sample?: string;
    device: string;
    begin_date?: string;
    lat: number;
    lon: number;
    water_depth: string;
    storage_meth?: string;
    links?: string[];
    intervals?: string[];
    cruise_links?: string[];
    igsn?: string;
    cored_length?: string;
}

export interface DepthRange {
    min: number;
    max: number;
}

export interface Interval {
    facility_code?: string;
    ship_code?: string;
    platform?: string;
    cruise?: string;
    sample?: string;
    device?: string;
    interval: number;
    depth_top?: number;
    depth_top_mm?: number;
    depth_bot?: number;
    depth_bot_mm?: number;
    dhcore_id?: string;
    dhcore_length?: number;
    dhcore_length_mm?: number;
    dhcore_interval?: string;
    dtop_in_dhcore?: string;
    dtop_mm_in_dhcore?: string;
    dbot_in_dhcore?: string;
    dbot_mm_in_dhcore?: string;
    lith1?: string;
    text1?: string;
    lith2?: string;
    text2?: string;
    comp1?: string;
    comp2?: string;
    comp3?: string;
    comp4?: string;
    comp5?: string;
    comp6?: string;
    description?: string;
    age?: string;
    absolute_age_top?: string;
    absolute_age_bot?: string;
    weight?: string;
    rock_lith?: string;
    rock_min?: string;
    weath_meta?: string;
    remark?: string;
    munsell_code?: string;
    munsell?: string;
    exhaust_code?: string;
    photo_link?: string;
    lake?: string;
    unit_number?: string;
    int_comments?: string;
    dhdevice?: string;
    cmcd_top?: string;
    mmcd_top?: string;
    cmcd_bot?: string;
    mmcd_bot?: string;
    publish?: string;
    previous_state?: string;
    igsn?: string;
    imlgs: string;
    parent_igsn?: string;
}
