export interface Filter {
    repository?: string;
    platform?: string;
    lake?: string;
    cruise?: string;
    device?: string;
    date?: string;
}

export interface Repository {
    facility: string;
    facility_code: string;
    sample_count?: number;
    facility_comment?: string;
}

export interface Cruise {
    cruise: string;
    facility_code: string;
    platform: string;
    leg?: string;
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
}
