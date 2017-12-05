import Dependencies.Library
import play.sbt.{PlayLayoutPlugin, PlayScala}
import play.twirl.sbt.Import.TwirlKeys._
import sbt._
name := """scala-play-angular-silhouette"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava).settings(
  watchSources ++= (baseDirectory.value / "public/ui" ** "*").get
)

sourceDirectories in (Compile, compileTemplates) += file("auth/twirl/auth/views/emails")
sourceDirectories in (Compile, TwirlKeys.compileTemplates) :=
  (unmanagedSourceDirectories in Compile).value

resolvers += Resolver.sonatypeRepo("snapshots")

scalaVersion := "2.12.3"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.2" % Test
libraryDependencies += "com.h2database" % "h2" % "1.4.196"

////*******************************
//// Test module
////*******************************

libraryDependencies ++= Seq(
  Library.Play.test,
  Library.Play.specs2,
  Library.Akka.testkit,
  Library.Specs2.matcherExtra,
  Library.scalaGuice,
  Library.playReactiveMongo,
  Library.embedMongo,
  filters
)

////*******************************
//// Core module
////*******************************

libraryDependencies ++= Seq(
  Library.apacheCommonsIO,
  Library.playReactiveMongo
)

////*******************************
//// Auth module
////*******************************

 libraryDependencies ++= Seq(
      Library.Silhouette.core,
      Library.Silhouette.passwordBcrypt,
      Library.Silhouette.persistence,
      Library.Silhouette.cryptoJca,
      Library.Silhouette.persistenceReactiveMongo,
      Library.scalaGuice,
      Library.ficus,
      Library.playMailer,
      Library.playMailerGuice,
      Library.akkaQuartzScheduler,
      Library.Silhouette.testkit % Test,
      Library.Specs2.matcherExtra % Test,
      Library.Akka.testkit % Test,
      ws,
      guice,
      specs2 % Test
    )