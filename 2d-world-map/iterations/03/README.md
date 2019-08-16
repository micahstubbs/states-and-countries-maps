WIP - need to fix panning after zoom

this iteration converts the example to the latest version of d3js, [v5.9.7](https://cdnjs.com/libraries/d3/5.9.7) at this writing.

ah, it looks like piwodlaiwo had a similar idea, and made some progress on this https://bl.ocks.org/piwodlaiwo/73f7a0e28c53d26c04f30a754de49085

---

this iteration adds a click event to the ocean that de-selects the country, if a country is selected.  Selections also now persist after dragging and zooming (though not when zooming from state level to country level, yet).

---

this iteration makes the code familiar to me and nice to work with

---

A d3 world map which shows the states of Canada and the USA on zoom. Also has rotation, but only when scale is set to 1 (zoomed out).

I combined a world topo.json file with a states topo.json file using something like this:

    node_modules/.bin/topojson --allow-empty -p name -o combined-countries-us-ca-states.json -- data/countries.topo.json data/states_usa.topo.json
    