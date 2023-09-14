export type VehicleStyle =
    | 'SUV'
    | 'Sedan'
    | 'Truck'
    | 'Coupe'
    | 'CUV'
    | 'Sports'
    | 'Hatchback'
    | 'Wagon'
    | 'Convertible'
    | 'Minivan'

export type VehicleType = 'Gas' | 'Hybrid' | 'Diesel' | 'Electric'
export type VehicleDrivetrain = 'All' | 'Front' | 'Rear'

export type Metadata = {
    mpg?: number
    fuelCapacity?: number
    hp?: number
}

export type Interior = {
    sunroof?: boolean
    radio?: boolean
    siriusXM?: boolean
    auto?: { wireless: boolean } // Andriod Auto
    carplay?: { wireless: boolean } // Apple Carplay
    electricDriverSeat?: boolean
    heatedSeats?: {
        driver: boolean
        passenger: boolean
    }
    ventilatedSeats?: {
        driver: boolean
        passenger: boolean
    }
}

export type Vehicle = {
    maker: string
    model: string
    trim: string
    style: VehicleStyle
    drive: VehicleDrivetrain
    type: VehicleType
    year: number
    msrp: number
    metadata: Metadata
}
