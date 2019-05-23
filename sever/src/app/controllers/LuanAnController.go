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

// Add an luanan
func CreateLuanAn(c *gin.Context) {
	database := c.MustGet("db").(*mgo.Database)

	luanan := models.LuanAn{}
	buf, _ := c.GetRawData()
	err := json.Unmarshal(buf, &luanan)
	if common.CheckError(c, err) {
		return
	}
	err = database.C(models.CollectionLuanAn).Insert(luanan)
	if common.CheckError(c, err) {
		return
	}
	c.JSON(http.StatusCreated, luanan)
}

//Update luanan
func UpdateLuanAn(c *gin.Context) {
	database := c.MustGet("db").(*mgo.Database)

	luanan := models.LuanAn{}
	buf, _ := c.GetRawData()
	err := json.Unmarshal(buf, &luanan)
	if common.CheckError(c, err) {
		return
	}
	luanan.ID = bson.ObjectIdHex(c.Param("id"))

	err = database.C(models.CollectionLuanAn).UpdateId(luanan.ID, luanan)
	if common.CheckError(c, err) {
		return
	}
}

//Delete an luanan

func DeleteLuanAn(c *gin.Context) {
	database := c.MustGet("db").(*mgo.Database)

	err := database.C(models.CollectionLuanAn).UpdateId(bson.ObjectIdHex(c.Param("id")), bson.M{"$set": bson.M{"IsDeleted": true}})
	if common.CheckError(c, err) {
		return
	}

	c.JSON(http.StatusNoContent, nil)
}

// List all luanans
func ListLuanAns(c *gin.Context) {
	database := c.MustGet("db").(*mgo.Database)

	luanan := []models.LuanAn{}
	err := database.C(models.CollectionLuanAn).Find(nil).All(&luanan)
	//err := database.C(models.CollectionLuanAn).Find(bson.M{"$or": []bson.M{{"Name": bson.RegEx{"12312", "$i"}}, {"Email": bson.RegEx{"q", "$i"}}, {"Department": bson.RegEx{"DC20", "$i"}}}}).All(&luanan)
	if common.CheckError(c, err) {
		return
	}
	c.JSON(http.StatusOK, luanan)
}

//Find luanan by keyword

func getLuanAnsByKeyWord(c *gin.Context, kw string) []models.LuanAn {
	database := c.MustGet("db").(*mgo.Database)
	luanan := []models.LuanAn{}
	err := database.C(models.CollectionLuanAn).Find(bson.M{"$or": []bson.M{{"Name": bson.RegEx{kw, "$i"}}, {"Author": bson.RegEx{kw, "$i"}}, {"Describe": bson.RegEx{kw, "$i"}}, {"Summary": bson.RegEx{kw, "$i"}}, {"Uname": bson.RegEx{kw, "$i"}}, {"Uauthor": bson.RegEx{kw, "$i"}}, {"Udescribe": bson.RegEx{kw, "$i"}}, {"Usummary": bson.RegEx{kw, "$i"}}}}).All(&luanan)
	// count, _ := database.C(models.CollectionLuanAn).Find(bson.M{"$or": []bson.M{{"Name": bson.RegEx{kw, "$i"}}, {"Author": bson.RegEx{kw, "$i"}}, {"Keyword": bson.RegEx{kw, "$i"}}, {"Sumary": bson.RegEx{kw, "$i"}}, {"Uname": bson.RegEx{kw, "$i"}}}}).Count(c, err)

	common.CheckError(c, err)

	return luanan

}

//Find luanan by keyword

func FindLuanAnsByKeyWord(c *gin.Context) {
	LuanAns := getLuanAnsByKeyWord(c, c.Param("kw"))
	c.JSON(http.StatusOK, LuanAns)

}

// Get luanan by id
func getLuanAnByID(c *gin.Context, id string) (error, *models.LuanAn) {
	database := c.MustGet("db").(*mgo.Database)
	oID := bson.ObjectIdHex(id)
	luanan := models.LuanAn{}
	err := database.C(models.CollectionLuanAn).FindId(oID).One(&luanan)
	if err != nil {
		return err, nil
	}

	return nil, &luanan
}
