from lxml import etree 
 
# Validate with DTD 
xml_file = "Bookstore.xml" 
dtd_file = "Bookstore.dtd" 
xml_doc = etree.parse(xml_file) 
dtd = etree.DTD(dtd_file) 
if dtd.validate(xml_doc): 
    print("XML is valid according to DTD") 
else: 
    print("DTD Validation failed:", dtd.error_log.filter_from_errors()) 
 
# Validate with XSD 
xsd_file = "Bookstore.xsd" 
xmlschema_doc = etree.parse(xsd_file) 
xmlschema = etree.XMLSchema(xmlschema_doc)
if xmlschema.validate(xml_doc): 
    print("XML is valid according to XSD") 
else: 
    print("XSD Validation failed:", xmlschema.error_log.filter_from_errors())