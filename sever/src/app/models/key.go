package models

import (
	"gopkg.in/mgo.v2/bson"
)

const (
	CollectionKey = "key"
)

type Key struct {
	ID     bson.ObjectId `bson:"_id,omitempty"`
	Key    string        `bson:"Key"`
	Kcount int           `bson:"Kcount"`
}
