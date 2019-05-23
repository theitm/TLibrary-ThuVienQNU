package main

import (
	"./controllers"
	"./db"
	"./middlewares"
	"github.com/gin-gonic/gin"
)

func init() {
	db.Connect()
}

func cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Content-Type", "application/json")
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Max-Age", "86400")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Max")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
		} else {
			c.Next()
		}
	}
}

func setupRouter() *gin.Engine {
	r := gin.Default()
	r.Use(cors())

	// Middlewares
	r.Use(middlewares.Connect)
	r.Use(middlewares.ErrorHandler)
	r.Use(cors())

	//Book

	r.POST("/book", controllers.CreateBook)
	r.PUT("/booku/:id", controllers.UpdateBook)
	r.DELETE("/book/:id", controllers.DeleteBook)
	r.GET("/books", controllers.ListBooks)
	r.GET("/book/:kw", controllers.FindBooksByKeyWord)

	//LuanVan

	r.POST("/luanvan", controllers.CreateLuanVan)
	r.PUT("/luanvanu/:id", controllers.UpdateLuanVan)
	r.DELETE("/luanvan/:id", controllers.DeleteLuanVan)
	r.GET("/luanvans", controllers.ListLuanVans)
	r.GET("/luanvan/:kw", controllers.FindLuanVansByKeyWord)

	//LuanAn

	r.POST("/luanan", controllers.CreateLuanAn)
	r.PUT("/luananu/:id", controllers.UpdateLuanAn)
	r.DELETE("/luanan/:id", controllers.DeleteLuanAn)
	r.GET("/luanans", controllers.ListLuanAns)
	r.GET("/luanan/:kw", controllers.FindLuanAnsByKeyWord)

	//Key

	r.POST("/key", controllers.CreateKey)
	r.PUT("/keyu/:id", controllers.UpdateKey)
	r.DELETE("/key/:id", controllers.DeleteKey)
	r.GET("/keys", controllers.ListKeys)
	r.GET("/key/:kw", controllers.FindKeysByKeyWord)

	return r
}

func main() {
	r := setupRouter()
	r.Run(":8080")
}
