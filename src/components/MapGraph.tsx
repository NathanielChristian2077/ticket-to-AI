import { useEffect, useMemo, useRef } from 'react'
import * as d3 from 'd3'
import { feature } from 'topojson-client'
import br-states from '../data/br-states.json'

type GeoCollection = GeoJSON.FeatureCollection<
   	GeoJSON.Geometry,
   	GeoJson.GeoJsonProperties
>

function MapGraph() {
	const svgRef = useRef<SVGSVGElement | null>(null)

	const geoData: GeoCollection = useMemo(() => {
		const objects = (brStates as any).objects

		const firstKey = Object.keys(objects)[0]

		return feature(brStates as any, objects[firstKey]) as GeoCollection
	}, [])
}
