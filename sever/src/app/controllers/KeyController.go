package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"../common"
	"../models"
	"github.com/gin-gonic/gin"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type Key struct {
	Key    string `bson:"Key"`
	Kcount int    `bson:"Kcount"`
}

// Add an key
func CreateKey(c *gin.Context) {
	database := c.MustGet("db").(*mgo.Database)

	key := models.Key{}
	buf, _ := c.GetRawData()
	err := json.Unmarshal(buf, &key)
	if common.CheckError(c, err) {
		return
	}
	err = database.C(models.CollectionKey).Insert(key)
	if common.CheckError(c, err) {
		return
	}
	c.JSON(http.StatusCreated, key)
}

//Update key
func UpdateKey(c *gin.Context) {
	database := c.MustGet("db").(*mgo.Database)

	key := models.Key{}
	buf, _ := c.GetRawData()
	err := json.Unmarshal(buf, &key)
	if common.CheckError(c, err) {
		return
	}
	key.ID = bson.ObjectIdHex(c.Param("id"))

	err = database.C(models.CollectionKey).UpdateId(key.ID, key)
	if common.CheckError(c, err) {
		return
	}
}

//Delete an key

func DeleteKey(c *gin.Context) {
	database := c.MustGet("db").(*mgo.Database)

	err := database.C(models.CollectionKey).UpdateId(bson.ObjectIdHex(c.Param("id")), bson.M{"$set": bson.M{"IsDeleted": "yes"}})
	if common.CheckError(c, err) {
		return
	}

	c.JSON(http.StatusNoContent, nil)
}

// List all keys
func ListKeys(c *gin.Context) {
	database := c.MustGet("db").(*mgo.Database)

	key := []models.Key{}
	err := database.C(models.CollectionKey).Find(bson.M{"IsDeleted": nil}).All(&key)
	//err := database.C(models.CollectionKey).Find(bson.M{"$or": []bson.M{{"Name": bson.RegEx{"12312", "$i"}}, {"Email": bson.RegEx{"q", "$i"}}, {"Department": bson.RegEx{"DC20", "$i"}}}}).All(&key)
	if common.CheckError(c, err) {
		return
	}
	c.JSON(http.StatusOK, key)
}

//Find key by keyword

func getKeysByKeyWord(c *gin.Context, kw string) []models.Key {
	database := c.MustGet("db").(*mgo.Database)
	key := []models.Key{}
	err := database.C(models.CollectionKey).Find(bson.M{"$or": []bson.M{{"Key": bson.RegEx{kw, "$i"}}}}).Sort("-Kcount").Limit(7).All(&key)
	common.CheckError(c, err)
	return key

}

//Find key by keyword

func FindKeysByKeyWord(c *gin.Context) {
	Keys := getKeysByKeyWord(c, c.Param("kw"))
	upKcount(c, c.Param("kw"))
	// go getKeysByKeyWord(c, c.Param("kw"))
	c.JSON(http.StatusOK, Keys)

}

// Get key by id
func getKeyByID(c *gin.Context, id string) (error, *models.Key) {
	database := c.MustGet("db").(*mgo.Database)
	oID := bson.ObjectIdHex(id)
	key := models.Key{}
	err := database.C(models.CollectionKey).FindId(oID).One(&key)
	if err != nil {
		return err, nil
	}

	return nil, &key
}

func upKcount(c *gin.Context, kw string) {
	database := c.MustGet("db").(*mgo.Database)
	key := models.Key{}
	err := database.C(models.CollectionKey).Find(bson.M{"Key": kw}).One(&key)
	if err != nil {
		nkey := Key{kw, 1}
		database.C(models.CollectionKey).Insert(nkey)
	} else {
		k := key.Kcount + 1
		id := key.ID
		nkey := Key{kw, k}
		database.C(models.CollectionKey).UpdateId(id, nkey)
		fmt.Printf("done!")
	}

}
