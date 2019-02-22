import React, { Component } from "react";
import Quagga from "quagga";

class Scanner extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="Scanner">
        <div id="interactive" className="viewport" />
      </div>
    );
  }

  componentDidMount() {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream"
        },
        decoder: {
          readers: ["code_39_reader"],
          debug: {
            drawBoundingBox: true,
            showFrequency: true,
            drawScanline: true,
            showPattern: true
          },
          multiple: true
        },
        locate: true,
        locator: {
          halfSample: true,
          patchSize: "medium", // x-small, small, medium, large, x-large
          debug: {
            showCanvas: false,
            showPatches: true,
            showFoundPatches: true,
            showSkeleton: false,
            showLabels: false,
            showPatchLabels: false,
            showRemainingPatchLabels: false,
            boxFromPatches: {
              showTransformed: false,
              showTransformedBox: false,
              showBB: false
            }
          }
        }
      },
      function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("Starting quagga");
        Quagga.start();
      }
    );
    Quagga.onDetected(this._onDetected);
    Quagga.onProcessed(function(result) {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute("width")),
            parseInt(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter(function(box) {
              return box !== result.box;
            })
            .forEach(function(box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "green",
                lineWidth: 2
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "#00F",
            lineWidth: 2
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            { color: "red", lineWidth: 3 }
          );
        }
      }
    });
  }

  componentWillUnmount() {
    Quagga.offDetected(this._onDetected);
  }

  _onDetected(result) {
    console.log(result);
    this.props.onDetected(result);
  }
}

export default Scanner;
