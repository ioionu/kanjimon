#!/usr/bin/env python
import xmltodict, json

def doit(filename):
    with open(filename, 'rb') as xmlfile:
        o = xmltodict.parse(xmlfile)
        print( json.dumps(o) )

if __name__=='__main__':
    doit('client/db/kanjidic2.xml')
