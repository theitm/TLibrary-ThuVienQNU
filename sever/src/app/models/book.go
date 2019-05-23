package models

import (
	"gopkg.in/mgo.v2/bson"
)

const (
	CollectionBook = "book"
)

type Book struct {
	ID        bson.ObjectId `bson:"_id,omitempty"`
	Name      string        `bson:"Name"`
	Author    string        `bson:"Author"`
	Year      string        `bson:"Year"`
	Keyword   string        `bson:"Keyword"`
	Sumary    string        `bson:"Sumary"`
	Code1     string        `bson:"Code1"`
	Code2     string        `bson:"Code2"`
	Code3     string        `bson:"Code3"`
	Uname     string        `bson:"Uname"`
	IsDeleted string        `bson:"IsDeleted"`
}
