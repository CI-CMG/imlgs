export type RepositoryNameResponse = {
  "items": [
    {
      "id": number
      "facility": string
      "facility_code": string
    }
  ],
  "page": number,
  "total_pages": number,
  "total_items": number,
  "items_per_page": number
}

export type CruiseNameResponse = {
  "items": [
    {
      "id": number
      "cruise": string
      "year": number,
      "legs": string[]
    }
  ],
  "page": number,
  "total_pages": number,
  "total_items": number,
  "items_per_page": number
}
