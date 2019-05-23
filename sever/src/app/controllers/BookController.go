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

// Add an book
func CreateBook(c *gin.Context) {
	database := c.MustGet("db").(*mgo.Database)

	book := models.Book{}
	buf, _ := c.GetRawData()
	err := json.Unmarshal(buf, &book)
	if common.CheckError(c, err) {
		return
	}
	err = database.C(models.CollectionBook).Insert(book)
	if common.CheckError(c, err) {
		return
	}
	c.JSON(http.StatusCreated, book)
}

//Update book
func UpdateBook(c *gin.Context) {
	database := c.MustGet("db").(*mgo.Database)

	book := models.Book{}
	buf, _ := c.GetRawData()
	err := json.Unmarshal(buf, &book)
	if common.CheckError(c, err) {
		return
	}
	book.ID = bson.ObjectIdHex(c.Param("id"))

	err = database.C(models.CollectionBook).UpdateId(book.ID, book)
	if common.CheckError(c, err) {
		return
	}
}

//Delete an book

func DeleteBook(c *gin.Context) {
	database := c.MustGet("db").(*mgo.Database)

	err := database.C(models.CollectionBook).UpdateId(bson.ObjectIdHex(c.Param("id")), bson.M{"$set": bson.M{"IsDeleted": "true"}})
	if common.CheckError(c, err) {
		return
	}

	c.JSON(http.StatusNoContent, nil)
}

// List all books
func ListBooks(c *gin.Context) {
	database := c.MustGet("db").(*mgo.Database)

	book := []models.Book{}
	err := database.C(models.CollectionBook).Find(nil).All(&book)
	//err := database.C(models.CollectionBook).Find(bson.M{"$or": []bson.M{{"Name": bson.RegEx{"12312", "$i"}}, {"Email": bson.RegEx{"q", "$i"}}, {"Department": bson.RegEx{"DC20", "$i"}}}}).All(&book)
	if common.CheckError(c, err) {
		return
	}
	c.JSON(http.StatusOK, book)
}

//Find book by keyword

func getBooksByKeyWord(c *gin.Context, kw string) []models.Book {
	database := c.MustGet("db").(*mgo.Database)
	book := []models.Book{}
	err := database.C(models.CollectionBook).Find(bson.M{"$or": []bson.M{{"Name": bson.RegEx{kw, "$i"}}, {"Author": bson.RegEx{kw, "$i"}}, {"Keyword": bson.RegEx{kw, "$i"}}, {"Sumary": bson.RegEx{kw, "$i"}}, {"Uname": bson.RegEx{kw, "$i"}}}}).All(&book)
	common.CheckError(c, err)

	return book

}

//Find book by keyword

func FindBooksByKeyWord(c *gin.Context) {
	Books := getBooksByKeyWord(c, c.Param("kw"))
	// go getBooksByKeyWord(c, c.Param("kw"))
	c.JSON(http.StatusOK, Books)

}

// Get book by id
func getBookByID(c *gin.Context, id string) (error, *models.Book) {
	database := c.MustGet("db").(*mgo.Database)
	oID := bson.ObjectIdHex(id)
	book := models.Book{}
	err := database.C(models.CollectionBook).FindId(oID).One(&book)
	if err != nil {
		return err, nil
	}

	return nil, &book
}
