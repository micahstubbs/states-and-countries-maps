const width = 962
let rotated = 90
const height = 502

// countries which have states, needed to toggle visibility
// for USA/ etc. either show countries or states, not both
let usa
let canada
let states // track states

// track where mouse was clicked
let initX

// track scale only rotate when s === 1
let s = 1
let mouseClicked = false
let currentSelection

const projection = d3
  .geoRobinson()
  .scale(153)
  .translate([width / 2, height / 1.5])
  .rotate([rotated, 0, 0]) // center on USA because 'murica

const svg = d3
  .select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  // track where user clicked down
  .on('mousedown', function() {
    d3.event.preventDefault()
    // only if scale === 1
    if (s !== 1) return
    initX = d3.mouse(this)[0]
    mouseClicked = true

    //  cache the current selection, if any
    currentSelection = d3.select('.selected')

    //  de-select any elements that were selected before
    d3.selectAll('.selected').classed('selected', false)
  })
  .on('mouseup', function() {
    if (s !== 1) return
    rotated = rotated + ((d3.mouse(this)[0] - initX) * 360) / (s * width)
    mouseClicked = false
  })

// for tooltip
const offsetL = document.getElementById('map').offsetLeft + 10
const offsetT = document.getElementById('map').offsetTop + 10

const path = d3.geoPath().projection(projection)

const tooltip = d3
  .select('#map')
  .append('div')
  .attr('class', 'tooltip hidden')

// need this for correct panning
var g = svg.append('g')

// get json data and draw it
d3.json('./combined-countries-us-ca-states.json')
  .then(response => draw(response))
  .catch(error => {
    console.error(error)
  })

function draw(world) {
  console.log('world', world)
  // countries
  g.append('g')
    .attr('class', 'boundary')
    .selectAll('boundary')
    .data(topojson.feature(world, world.objects.countries).features)
    .enter()
    .append('path')
    .attr('name', d => d.properties.name)
    .attr('id', d => d.id)
    .on('click', selected)
    .on('mousemove', showTooltip)
    .on('mouseout', (d, i) => {
      tooltip.classed('hidden', true)
    })
    .attr('d', path)

  usa = d3.select('#USA')
  canada = d3.select('#CAN')

  // states
  g.append('g')
    .attr('class', 'boundary state hidden')
    .selectAll('boundary')
    .data(topojson.feature(world, world.objects.states).features)
    .enter()
    .append('path')
    .attr('name', d => d.properties.name)
    .attr('id', d => d.id)
    .on('click', selected)
    .on('mousemove', showTooltip)
    .on('mouseout', (d, i) => {
      tooltip.classed('hidden', true)
    })
    .attr('d', path)

  states = d3.selectAll('.state')

  states.classed('hidden', false)
  usa.classed('hidden', true)
  canada.classed('hidden', true)
}

function showTooltip(d) {
  label = d.properties.name
  const mouse = d3.mouse(svg.node()).map(d => parseInt(d))
  tooltip
    .classed('hidden', false)
    .attr('style', `left:${mouse[0] + offsetL}px;top:${mouse[1] + offsetT}px`)
    .html(label)
}

function selected() {
  currentSelection = d3.select(this)
  currentSelection.classed('selected', true)
}


