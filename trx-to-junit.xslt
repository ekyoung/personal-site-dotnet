<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet 
    version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:xs="http://www.w3.org/2001/XMLSchema"  
    xmlns:vs="http://microsoft.com/schemas/VisualStudio/TeamTest/2010" >
  <xsl:output method="xml" indent="yes" />
  <xsl:template match="/">
    <testsuites>
      <xsl:variable name="buildName" select="//vs:TestRun/@name"/>
      <xsl:variable name="duration" select="xs:dateTime(//vs:Times/@finish) - xs:dateTime(//vs:Times/@start)" />
      <xsl:variable name="totalDuration" select="hours-from-duration($duration)*3600 + minutes-from-duration($duration)*60 + seconds-from-duration($duration)" />
      <xsl:variable name="numberOfTests" select="count(//vs:UnitTestResult/@testId)"/>
      <xsl:variable name="numberOfFailures" select="count(//vs:UnitTestResult/@outcome[.='Failed'])" />
      <xsl:variable name="numberOfErrors" select="count(//vs:UnitTestResult[not(@outcome)])" />
      <xsl:variable name="numberSkipped" select="count(//vs:UnitTestResult/@outcome[.!='Passed' and .!='Failed'])" />
      <testsuite name="MSTestSuite"
        tests="{$numberOfTests}"
        time="{$totalDuration}"
        failures="{$numberOfFailures}"
        errors="{$numberOfErrors}"
        skipped="{$numberSkipped}">
        <xsl:for-each select="//vs:UnitTestResult">
          <xsl:variable name="testName" select="@testName"/>
          <xsl:variable name="executionId" select="@executionId"/>
          <xsl:variable name="testId" select="@testId"/>
          <xsl:variable name="totalduration">
            <xsl:choose>
              <xsl:when test="@duration">
                <xsl:variable name="duration" select="xs:dateTime(@endTime) - xs:dateTime(@startTime)" />
                <xsl:variable name="milisecond" select="substring-after(@duration, '.')"/>
                <xsl:value-of select="hours-from-duration($duration)*3600 + minutes-from-duration($duration)*60 + seconds-from-duration($duration)"/>
                <xsl:text>.</xsl:text>
                <xsl:value-of select="$milisecond"/>
              </xsl:when>
              <xsl:otherwise>
                <xsl:variable name="duration" select="xs:dateTime(@endTime) - xs:dateTime(@startTime)" />
                <xsl:value-of select="hours-from-duration($duration)*3600 + minutes-from-duration($duration)*60 + seconds-from-duration($duration)"/>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:variable>
          <xsl:variable name="outcome">
            <xsl:choose>
              <xsl:when test="@outcome">
                <xsl:value-of select="@outcome"/>
              </xsl:when>
              <xsl:otherwise>
                <xsl:value-of select="'Error'"/>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:variable>
          <xsl:variable name="message" select="vs:Output/vs:ErrorInfo/vs:Message"/>
          <xsl:variable name="stacktrace" select="vs:Output/vs:ErrorInfo/vs:StackTrace"/>
          <xsl:for-each select="//vs:UnitTest">
            <xsl:variable name="currentTestId" select="@id"/>
            <xsl:if test="$currentTestId = $testId" >
              <xsl:variable name="className" select="vs:TestMethod/@className"/>
              <testcase classname="{$className}"
                name="{$testName}"
                time="{$totalduration}">
                <xsl:if test="contains($outcome, 'Failed')">
                  <failure>
                    MESSAGE:
                    <xsl:value-of select="$message" />
                    +++++++++++++++++++
                    STACK TRACE:
                    <xsl:value-of select="$stacktrace" />
                  </failure>
                </xsl:if>
                <xsl:if test="contains($outcome, 'Error')">
                  <error>
                    MESSAGE:
                    <xsl:value-of select="$message" />
                    +++++++++++++++++++
                    STACK TRACE:
                    <xsl:value-of select="$stacktrace" />
                  </error>
                </xsl:if>
              </testcase>
            </xsl:if>
          </xsl:for-each>
        </xsl:for-each>
      </testsuite>
    </testsuites>
  </xsl:template>
</xsl:stylesheet>