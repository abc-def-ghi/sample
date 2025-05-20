from lxml import etree 
 
# Validate with DTD 
xml_file = "Bookstore.xml" 
dtd_file = "Bookstore.dtd" 
xml_doc = etree.parse(xml_file)
root = xml_doc.getroot()
dtd = etree.DTD(dtd_file) 
if dtd.validate(xml_doc): 
    print("XML is valid according to DTD")
    print(etree.tostring(root, pretty_print=True).decode())
else: 
    print("DTD Validation failed:", dtd.error_log.filter_from_errors()) 
 
# Validate with XSD 
xsd_file = "Bookstore.xsd" 
xmlschema_doc = etree.parse(xsd_file)
root1 = xmlschema_doc.getroot()
xmlschema = etree.XMLSchema(xmlschema_doc)
if xmlschema.validate(xml_doc): 
    print("XML is valid according to XSD")
    print(etree.tostring(root1, pretty_print=True).decode())
else: 
    print("XSD Validation failed:", xmlschema.error_log.filter_from_errors())
