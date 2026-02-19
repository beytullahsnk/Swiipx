// Google Maps Types for Places Autocomplete

declare global {
  interface Window {
    google: typeof google
  }
}

declare namespace google {
  namespace maps {
    class LatLng {
      lat(): number
      lng(): number
    }

    namespace places {
      interface AutocompleteOptions {
        fields?: string[]
        types?: string[]
        componentRestrictions?: {
          country: string | string[]
        }
      }

      interface PlaceGeometry {
        location?: LatLng
      }

      interface PlaceResult {
        formatted_address?: string
        geometry?: PlaceGeometry
        name?: string
        place_id?: string
        formatted_phone_number?: string
      }

      class Autocomplete {
        constructor(
          input: HTMLInputElement,
          options?: AutocompleteOptions
        )
        addListener(event: string, handler: () => void): void
        getPlace(): PlaceResult
      }
    }

    namespace event {
      function clearInstanceListeners(instance: any): void
    }
  }
}

export {}

