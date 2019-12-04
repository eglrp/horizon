package horizon

import (
	"fmt"

	"github.com/golang/geo/s2"
)

// States Set of states
type States []*State

// State Representation of state (in terms of Hidden Markov Model)
/*
	RoadPositionID - unique identifier of state
	GraphEdge - pointer to closest edge in graph
	GraphVertex  - indentifier of closest vertex
	Projected - point (Observation) project onto edge, pointer to GeoPoint
*/
type State struct {
	RoadPositionID int
	GraphEdge      *Edge
	GraphVertex    int
	Projected      *GeoPoint
}

// NewState Returns pointer to created State
/*
	stateID - unique identifier for state
	graphVertex - indentifier of vertex which is closest to Observation
	e - pointer to Edge
	lon - longitude (X for SRID = 0)
	lat - latitude (Y for SRID = 0)
	srid - SRID (see https://en.wikipedia.org/wiki/Spatial_reference_system)
*/
func NewState(stateID, graphVertex int, e *Edge, lon, lat float64, srid ...int) *State {
	state := State{
		RoadPositionID: stateID,
		GraphEdge:      e,
		GraphVertex:    graphVertex,
	}
	if len(srid) != 0 {
		switch srid[0] {
		case 0:
			state.Projected = newGeoPoint(lon, lat, 0)
			break
		case 4326:
			state.Projected = newGeoPoint(lon, lat, 4326)
			break
		default:
			state.Projected = newGeoPoint(lon, lat, 4326)
			break
		}
	}
	return &state
}

// ID Method to fit interface State (see https://github.com/LdDl/viterbi/blob/master/viterbi.go#L9)
func (state State) ID() int {
	return state.RoadPositionID
}

// String Pretty format for State
func (state State) String() string {
	latlng := s2.LatLngFromPoint(state.Projected.Point)
	return fmt.Sprintf(
		"State is:\n\tSourceVertexID => %v\n\tTargetVertexID => %v\n\tSRID: %d\n\tCoords => %v",
		state.GraphEdge.Source, state.GraphEdge.Target, state.Projected.srid, latlng.String(),
	)
}
