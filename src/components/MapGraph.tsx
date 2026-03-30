import { useEffect, useMemo, useRef } from 'react'
import * as d3 from 'd3'
import { feature } from 'topojson-client'
import brStates from '../data/br-states.json'
import { capitals } from '../data/capitals.ts'

type BrazilTopoJSON = {
  type: 'Topology'
  objects: {
    estados: GeoJSON.GeometryCollection
  }
  arcs: number[][][]
  transform: {
    scale: [number, number]
    translate: [number, number]
  }
}

type GeoCollection = GeoJSON.FeatureCollection<
  GeoJSON.Geometry,
  GeoJSON.GeoJsonProperties
>

function MapGraph() {
  const svgRef = useRef<SVGSVGElement | null>(null)

  const geoData = useMemo<GeoCollection>(() => {
    const topo = brStates as unknown as BrazilTopoJSON

    return feature(
      topo as any,
      topo.objects.estados as any,
    ) as unknown as GeoCollection
  }, [])

  const { width, height, projection, pathGenerator } = useMemo(() => {
    const width = 900
    const height = 700

    const projection = d3.geoMercator().fitSize([width, height], geoData)
    const pathGenerator = d3.geoPath(projection)

    return { width, height, projection, pathGenerator }
  }, [geoData])

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    svg
      .append('g')
      .selectAll('path')
      .data(geoData.features)
      .enter()
      .append('path')
      .attr('d', (d) => pathGenerator(d) || '')
      .attr('class', 'state-path')

    const capitalsGroup = svg.append('g').append('g').attr('class', 'capitalsGroup')

    capitals.forEach((capital) => {
      const projected = projection([capital.longitude, capital.latitude])

      if(!projected) return

      const [x, y] = projected

      capitalsGroup
        .append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 4)
        .attr('class', 'capital-point')

      capitalsGroup
        .append('text')
        .attr('x', x + 7)
        .attr('y', y + 3)
        .attr('class', 'capital-label')
        .text(capital.uf)
    });
  }, [geoData, pathGenerator, projection])

  return (
    <div className="map-graph-container">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="map-graph-svg"
        role="img"
        arial-label="Mapa do Brasil"
      />
    </div>
  )
}

export default MapGraph
