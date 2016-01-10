#!/usr/bin/env python
from bottle import route, run, template, static_file

@route('/client/js/<filename:path>')
def send_static(filename):
    return static_file(filename, root='/home/gamera/code/kanjimon/client/js')

@route('/client/db/<filename:path>')
def send_static(filename):
    return static_file(filename, root='/home/gamera/code/kanjimon/client/db')


@route('/hello/<name>')
def index(name):
#    return template('<b>Hello {{name}}</b>!', name=name)
    return template('templates/hello', name=name)

run(host='localhost', port=8080)
