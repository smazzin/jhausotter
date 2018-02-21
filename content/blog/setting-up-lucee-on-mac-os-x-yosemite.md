---
date: 2015-06-16T06:11:26+00:00
title: "Setting Up Lucee on Mac Os X Yosemite"
authors: ["jhausotter"]
tags: []
pagetitle: Setting up Lucee on Mac OS X Yosemite
image: ""
showonlyimage: "false"
---

## Getting Lucee on mac os x yosemite running apache HTTP (with virtual hosts) and tomcat 8 locally steps

Initially I started out by installing tomcat 8\. I followed this guide [here](http://wolfpaulus.com/jounal/mac/tomcat8/).
<!--more-->

Next I followed the instructions for getting Lucee up and running locally [Found here](https://bitbucket.org/lucee/lucee/wiki/Installing%20Tomcat%20and%20Lucee%20on%20OS%20X%20using%20the%20lucee%20.war%20file).

I then made sure I could browse to ```localhost:8080/lucee/admin/web.cfm``` and verified Lucee was installed.

Next when reading through [this page](https://bitbucket.org/lucee/lucee/wiki/Installing%20and%20configuring%20Lucee%20(JAR%20files)%20on%20Windows).

I Edited my ```web.xml``` file In the web.xml file (can be found here: Your-path/to/Tomcat/conf/web.xml.) At the end of the web.xml file, you will find this list:

```html
<welcome-file-list>
      <welcome-file>index.html</welcome-file>
      <welcome-file>index.htm</welcome-file>
      <welcome-file>index.jsp</welcome-file>
</welcome-file-list>
```

Append new line containing index.cfm as the last line: So it should look like the following now:
```html
<welcome-file-list>
    <welcome-file>index.html</welcome-file>
    <welcome-file>index.htm</welcome-file>
    <welcome-file>index.jsp</welcome-file>
    <welcome-file>index.cfm</welcome-file>
</welcome-file-list>
```

Below this list, new servlets and their mappings must be added: Note: if you DID follow the instructions from the link above for installing tomcat 8 for the following line: ```<param-value>/Library/Tomcat/Lucee</param-value>``` you can just do a straight copy and paste of what i have below and should be fine leaving as is.

If not It would be something like the following Example:
```html
<param-value>/Your/Path/To/Lucee</param-value>

<servlet>
    <servlet-name>CFMLServlet</servlet-name>
    <description>CFML runtime Engine</description>
    <servlet-class>lucee.loader.servlet.CFMLServlet</servlet-class>
    <init-param>
       <param-name>lucee-server-directory</param-name>
       <param-value>/Library/Tomcat/Lucee</param-value>
       <description>Lucee Server configuration directory (for Server-wide configurations, settings, and libraries)</description>
    </init-param>
    <init-param>
        <param-name>lucee-web-directory</param-name>
        <param-value>{web-root-directory}/WEB-INF/lucee/</param-value>
        <description>Lucee Web Directory (for Website-specific configurations, settings, and libraries)</description>
    </init-param>
    <load-on-startup>1</load-on-startup>
</servlet>

<servlet>
    <servlet-name>RESTServlet</servlet-name>
    <description>Servlet to access REST service</description>
    <servlet-class>lucee.loader.servlet.RestServlet</servlet-class>
    <load-on-startup>2</load-on-startup>
</servlet>

<servlet-mapping>
    <servlet-name>CFMLServlet</servlet-name>
    <url-pattern>*.cfm</url-pattern>
    <url-pattern>*.cfml</url-pattern>
    <url-pattern>*.cfc</url-pattern>
    <url-pattern>/index.cfm/*</url-pattern>
    <url-pattern>/index.cfc/*</url-pattern>
    <url-pattern>/index.cfml/*</url-pattern>
</servlet-mapping>

<servlet-mapping>
    <servlet-name>RESTServlet</servlet-name>
     <url-pattern>/rest/*</url-pattern>
</servlet-mapping>
```

### Configuring apache HTTP server

It was this post below by Gavin Pickin that really helped me out a lot with my current setup [http://www.gpickin.com/index.cfm/blog/apache-and-tomcat-save-yourself-the-xml-editing-no-more-tomcat-restarts](http://www.gpickin.com/index.cfm/blog/apache-and-tomcat-save-yourself-the-xml-editing-no-more-tomcat-restarts)

Gavin gave an excellent solution that I used. Thank you Gavin for this post. He does a pretty good job at explaining in detail better than I will here.

To get to the nitty gritty: Edit your server.xml file (/Library/Tomcat/conf OR your-path-to/tomcat/conf/server.xml)

**Found at the bottom of the file you will see this chunk of code:**
```html
    <Host name="localhost"  appBase="webapps"
                unpackWARs="true" autoDeploy="true">
            <!-- SingleSignOn valve, share authentication between web applications
                 Documentation at: /docs/config/valve.html -->

            <Valve className="org.apache.catalina.authenticator.SingleSignOn" />

            <!-- Access log processes all example.
                 Documentation at: /docs/config/valve.html
                 Note: The pattern used is equivalent to using pattern="common" -->
            <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
                   prefix="localhost_access_log" suffix=".txt"
                   pattern="%h %l %u %t &quot;%r&quot; %s %b" />
          </Host>
```
**I edited mine so it now looks like the following:**
```html
<Host name="localhost"  appBase="webapps" unpackWARs="true" autoDeploy="true">

  <Context path="" docBase="/your/path/to/websites" />

  <Valve className="org.apache.catalina.authenticator.SingleSignOn" />

  <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
      prefix="localhost_access_log" suffix=".txt"
      pattern="%h %l %u %t &quot;%r&quot; %s %b" />
</Host>
```
Your context docBase would just be wherever your current local web directory is.

Save file. Restart tomcat.

Again, in Gavin's post found [here](http://www.gpickin.com/index.cfm/blog/apache-and-tomcat-save-yourself-the-xml-editing-no-more-tomcat-restarts ) He goes into greater detail than I do about editing your .conf files.

Next we will want to edit our httpd-vhosts file (your-path-to/etc/apache2/extra/httpd-vhosts.conf). This is if you are using virtual hosts set up on your dev machine. With my current set up, I am.

We will want to add the following inside one of your virtual host you have set up.
```html
<Proxy *>
    Allow from 127.0.0.1
    </Proxy>
    ProxyPreserveHost On
    ProxyPassMatch ^/(.+\.cf[cm])(/.*)?$ ajp://localhost:8009/jhausotter/$1$2
```
So it should look like:
```html
<Directory "/Users/hausotter/sites/jhausotter/">
  Allow From All
  AllowOverride All
  Options +Indexes
  Require all granted
  DirectoryIndex index.cfm
</Directory>
<VirtualHost *:8001>
  ServerName "local.jhaus"
  ServerAlias "local.jhaus.*.*.*.*.xip.io"
  DocumentRoot "/Users/hausotter/sites/jhausotter"
  <Proxy *>
  Allow from 127.0.0.1
  </Proxy>
  ProxyPreserveHost On
  ProxyPassMatch ^/(.+\.cf[cm])(/.*)?$ ajp://localhost:8009/jhausotter/$1$2
</VirtualHost>
```
After you make your changes to your httpd-vhosts.conf file, save it. Restart apache. You should now be rockin lucee. Note:I have my local sites running on separate ports (easier for me to manage) Your setup may differ from mine.
