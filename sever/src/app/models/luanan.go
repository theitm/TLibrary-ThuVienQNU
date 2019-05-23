package models

import (
	"gopkg.in/mgo.v2/bson"
)

const (
	CollectionLuanAn = "luanan"
)

type LuanAn struct {
	ID        bson.ObjectId `bson:"_id,omitempty"`
	Name      string        `bson:"Name"`
	Author    string        `bson:"Author"`
	Describe  string        `bson:"Describe"`
	Summary   string        `bson:"Summary"`
	Code      string        `bson:"Code"`
	Uname     string        `bson:"Uname"`
	Uauthor   string        `bson:"Uauthor"`
	Udescribe string        `bson:"Udescribe"`
	Usummary  string        `bson:"Usummary"`
	IsDeleted string        `bson:"IsDeleted"`
}
