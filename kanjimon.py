#!/usr/bin/env python
from bottle import route, run, template, static_file, response

@route('/client/js/<filename:path>')
def send_static(filename):
    f = static_file(filename, root='/home/gamera/code/kanjimon/client/js')
    f.set_header('Service-Worker-Allowed', '/')
    return f

@route('/client/db/<filename:path>')
def send_static(filename):
    return static_file(filename, root='/home/gamera/code/kanjimon/client/db')

@route('/serviceWorker.js')
def send_static():
    f = static_file('serviceWorker.js', root='/home/gamera/code/kanjimon/client/js')
    f.set_header('Service-Worker-Allowed', '/')
    return f

@route('/hello/<name>')
def index(name):
    return template('templates/hello', name=name)

@route('/')
def index():
    name = "waqeqer"
    return template('templates/hello', name=name)

@route('/km')
def index():
    name = "waqeqer"
    return template('templates/hello', name=name)

@route('/search/<name>')
def index(name):
    name = "waqeqer"
    return template('templates/hello', name=name)


run(host='localhost', port=8080)
