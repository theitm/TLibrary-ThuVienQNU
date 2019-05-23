package controllers

import (
	"encoding/json"
	"net/http"

	"../common"
	"../models"
	"github.com/gin-gonic/gin"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// Add an luanvan
func CreateLuanVan(c *gin.Context) {
	database := c.MustGet("db").(*mgo.Database)

	luanvan := models.LuanVan{}
	buf, _ := c.GetRawData()
	err := json.Unmarshal(buf, &luanvan)
	if common.CheckError(c, err) {
		return
	}
	err = database.C(models.CollectionLuanVan).Insert(luanvan)
	if common.CheckError(c, err) {
		return
	}
	c.JSON(http.StatusCreated, luanvan)
}

//Update luanvan
func UpdateLuanVan(c *gin.Context) {
	database := c.MustGet("db").(*mgo.Database)

	luanvan := models.LuanVan{}
	buf, _ := c.GetRawData()
	err := json.Unmarshal(buf, &luanvan)
	if common.CheckError(c, err) {
		return
	}
	luanvan.ID = bson.ObjectIdHex(c.Param("id"))

	err = database.C(models.CollectionLuanVan).UpdateId(luanvan.ID, luanvan)
	if common.CheckError(c, err) {
		return
	}
}

//Delete an luanvan

func DeleteLuanVan(c *gin.Context) {
	database := c.MustGet("db").(*mgo.Database)

	err := database.C(models.CollectionLuanVan).UpdateId(bson.ObjectIdHex(c.Param("id")), bson.M{"$set": bson.M{"IsDeleted": true}})
	if common.CheckError(c, err) {
		return
	}

	c.JSON(http.StatusNoContent, nil)
}

// List all luanvans
func ListLuanVans(c *gin.Context) {
	database := c.MustGet("db").(*mgo.Database)

	luanvan := []models.LuanVan{}
	//.Sort("Year").Limit(7)
	err := database.C(models.CollectionLuanVan).Find(bson.M{"IsDeleted": nil}).All(&luanvan)
	//err := database.C(models.CollectionLuanVan).Find(bson.M{"$or": []bson.M{{"Name": bson.RegEx{"12312", "$i"}}, {"Email": bson.RegEx{"q", "$i"}}, {"Department": bson.RegEx{"DC20", "$i"}}}}).All(&luanvan)
	if common.CheckError(c, err) {
		return
	}
	c.JSON(http.StatusOK, luanvan)
}

//Find luanvan by keyword

func getLuanVansByKeyWord(c *gin.Context, kw string) []models.LuanVan {
	database := c.MustGet("db").(*mgo.Database)
	luanvan := []models.LuanVan{}
	err := database.C(models.CollectionLuanVan).Find(bson.M{"$or": []bson.M{{"Name": bson.RegEx{kw, "$i"}}, {"Author": bson.RegEx{kw, "$i"}}, {"Describe": bson.RegEx{kw, "$i"}}, {"Summary": bson.RegEx{kw, "$i"}}, {"Uname": bson.RegEx{kw, "$i"}}, {"Uauthor": bson.RegEx{kw, "$i"}}, {"Udescribe": bson.RegEx{kw, "$i"}}, {"Usummary": bson.RegEx{kw, "$i"}}}}).All(&luanvan)
	// count, _ := database.C(models.CollectionLuanVan).Find(bson.M{"$or": []bson.M{{"Name": bson.RegEx{kw, "$i"}}, {"Author": bson.RegEx{kw, "$i"}}, {"Keyword": bson.RegEx{kw, "$i"}}, {"Sumary": bson.RegEx{kw, "$i"}}, {"Uname": bson.RegEx{kw, "$i"}}}}).Count(c, err)

	common.CheckError(c, err)

	return luanvan

}

//Find luanvan by keyword

func FindLuanVansByKeyWord(c *gin.Context) {
	LuanVans := getLuanVansByKeyWord(c, c.Param("kw"))
	c.JSON(http.StatusOK, LuanVans)
	// getKeysByKeyWord()
}

// Get luanvan by id
func getLuanVanByID(c *gin.Context, id string) (error, *models.LuanVan) {
	database := c.MustGet("db").(*mgo.Database)
	oID := bson.ObjectIdHex(id)
	luanvan := models.LuanVan{}
	err := database.C(models.CollectionLuanVan).FindId(oID).One(&luanvan)
	if err != nil {
		return err, nil
	}

	return nil, &luanvan
}
