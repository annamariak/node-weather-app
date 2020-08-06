const request = require('postman-request')

const geocoding = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidHNlcmdpdW0iLCJhIjoiY2s5anRtamVtMDFqdjNmbDQwbWJ3NnV1biJ9.TIuG2Ln-qQOMO5h7nbbD_Q&limit=1'
    
    request({ url, json: true}, (error, response, { features }) => {
        if(error) {
           callback('Unable to connect to weather API', undefined)
        } else if (features.length === 0 ) {
            callback('Please try a different search term', undefined)
        } else {
            const { center, place_name: location} = features[0]
            const latitude = center[1]
            const longitude = center[0]

            callback(undefined, {
                latitude,
                longitude,
                location
            })
        }
    })
}

module.exports = geocoding