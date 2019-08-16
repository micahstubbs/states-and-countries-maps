a static version that shows states. Mercator projection. Centered on Europe this time.

this iteration uses a Robinson projection, like in this other example http://bl.ocks.org/almccon/dc1acd0b5d33c18c706f2d1e3ec5f3eb

---

this iteration converts the example to the latest version of d3js, [v5.9.7](https://cdnjs.com/libraries/d3/5.9.7) at this writing.

---

this iteration adds a click event to the ocean that de-selects the country, if a country is selected.  Selections also now persist after dragging and zooming (though not when zooming from state level to country level, yet).

---

this iteration makes the code familiar to me and nice to work with

---

A d3 world map which shows the states of Canada and the USA on zoom. Also has rotation, but only when scale is set to 1 (zoomed out).

I combined a world topo.json file with a states topo.json file using something like this:

    node_modules/.bin/topojson --allow-empty -p name -o combined-countries-us-ca-states.json -- data/countries.topo.json data/states_usa.topo.json
    