---
layout: post
title:  "D3v4 event filtering example"
description: "To prevent events from affecting certain elements, certain behaviors (such as zoom) can be filtered so that their events ignore specified elements."
tags: javascript d3.js
thumbnail: 
---

Differences between v3 and v4

* The brush keeps a constant width or height when the shift key is pressed so we can't use that for selection
    - Had to fork d3-brush to remove its default shift key behavior
* How the brush is called and cleared on keydown
* Whether a node is fixed is specified by the `.fx` and `.fy` parameters. This eliminates the need to set the
  `.fixed` parameter on each node.
* Clear the selection when someone clicks on the background, this fixes the issue in the previous version
 where zooming would clear the selection

<div align='center' id="d3_selectable_force_directed_graph" style="width: 400px; height: 300px; margin: auto">
    <svg />
</div>

<link rel='stylesheet' href='/css/d3v4-selectable-zoomable-force-directed-graph.css'>
<script type='text/javascript'>
    var d3v3 = d3;
    d3 = d3v4;
    // load the lite brush into the d3v4 namespace
</script>
<script src="/js/d3v4-brush-lite.js"></script>
<script type='text/javascript'>
    // restore the v3 namespace
    var d3 = d3v3;
</script>
<script src="/js/d3v4-selectable-force-directed-graph.js"></script>

<script>
    var svg = d3.select('#d3_selectable_force_directed_graph');

    d3.json('/jsons/miserables.with-ids.json', function(error, graph) {
        if (!error) {
            //console.log('graph', graph);
            createV4SelectableForceDirectedGraph(svg, graph);
        } else {
            console.error(error);
        }
    });
</script>