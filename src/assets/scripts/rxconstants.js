var RxConstants = function() {

    var constants = {
        'COLORS': {
            'FILL_COLOR' : 0,
            'STROKE_COLOR' : 1,
            'TEXT_COLOR' : 2
        },
        /* Types are predefined */
        'ANNOTATION_TYPES': {
            '0': {
                '0': 'PEN',
                '1': 'ERASER'
            },
            '1': {
                '0': 'POLYGON',
                '1': ['PEN','POLYLINE'],
                '2': 'POLYGON',
                '3': 'PATH'
            },
            '2': {
                '0': ['SHAPE', 'POLYCURVE']
            },
            '3': {
                '0': ['SHAPE', 'RECTANGLE'],
                '1': ['SHAPE', 'ROUNDED_RECTANGLE'],
                '3': 'MARKER'
            },
            '4': {
                '0': ['SHAPE', 'ELLIPSE']
            },
            '5': {
                '0': ['SHAPE', 'CLOUD']
            },
            '6': {
                '0': ['ARROW', 'OPEN_SINGLE_END'],
                '1': ['ARROW', 'FILLED_SINGLE_END'],
                '2': ['ARROW', 'OPEN_BOTH_ENDS'],
                '3': ['ARROW', 'FILLED_BOTH_ENDS']
            },
            '7': {
                '0': ['DIMENSION', "BAR"],
                '1': ['DIMENSION', "OPEN_ARROW"]
            },
            '8': {
                '0': 'AREA'
            },
            '9': {
                '0': 'TEXT',
                '1': 'TEXT'
            },
            '10': {
                '0': 'NOTE'
            },
            '11': {
                '0': 'IMAGE'
            },
            '12': {
                '0': 'STAMP',
                '1': 'STAMP',
                '2': 'STAMP',
                '3': 'STAMP',
                '4': 'STAMP',
                '5': 'STAMP',
                '6': 'STAMP',
                '7': 'STAMP',
                '8': 'STAMP',
                '9': 'STAMP'
            },
            '13' : {
                '0' : 'COUNT',
                '1' : 'COUNT',
                '2' : 'COUNT',
                '3' : 'COUNT',
                '4' : 'COUNT',
                '5' : 'COUNT',
                '6' : 'COUNT',
                '7' : 'COUNT'
            } 
        },
        /* Titles could be changed */
        'ANNOTATION_TITLES': {
            '0': {
                '0': 'Freehand pen',
                '1': 'Eraser'
            },
            '1': {
                '1': 'Polyline',
                '2': 'Polygon',
                '3': 'Measure Path'
            },
            '2': {
                '0': 'Polycurve'
            },
            '3': {
                '0': 'Rectangle',
                '1': 'Rounded Rectangle',
                '3': 'Marker'
            },
            '4': {
                '0': 'Oval'
            },
            '5': {
                '0': 'Revision Cloud'
            },
            '6': {
                '0': 'Arrow'
            },
            '7': {
                '0': 'Dimension Line',
                '1': 'Dimension Line',
                'measure': 'Length:'
            },
            '8': {
                '0': 'Area',
                'measure': 'Area:'
            },
            '9': {
                '0': 'Text'
            },
            '10': {
                '0': 'Note'
            },
            '11': {
                '0': 'Image'
            },
            '12': {
                '0': 'Stamp'
            },
            '13': {
                '0': 'Counter'
            }

        },
        'BACKGROUNDS' : {
            'BG_HATCH_DIAGINAL_FORWARD': 3,
            'BG_HATCH_DIAGONAL_BACK': 2,
            'BG_HATCH_DIAGONAL_CROSS': 5,
            'BG_HATCH_HORIZONTAL': 0,
            'BG_HATCH_VERTICAL': 1,
            'BG_HATCH_CROSS': 4


    },
        'SHAPE': {
            'RECTANGLE': {
                'TYPE': 0,
                'SUB_TYPE': 0
            },
            'ELLIPSE': {
                'TYPE': 1,
                'SUB_TYPE': 0
            },
            'ROUNDED_RECTANGLE': {
                'TYPE': 0,
                'SUB_TYPE': 1
            },
            'POLYGON': {
                'TYPE': 3,
                'SUB_TYPE': 0
            },
            'CLOUD': {
                'TYPE': 2,
                'SUB_TYPE': 0
            }
        },
        'ARROW': {
            'OPEN_SINGLE_END': 0,
            'FILLED_SINGLE_END': 1,
            'OPEN_BOTH_ENDS': 2,
            'FILLED_BOTH_ENDS': 3
        },
        'LENGTH': {
            'DIMENSION_BAR': 0,
            'DIMENSION_OPEN_ARROW': 1
        },
        
        'COUNT' : {
            'CIRCLE': {
                'TYPE': 13,
                'SUB_TYPE': 0
            },
            'SQUARE': {
                'TYPE': 13,
                'SUB_TYPE': 1
            },
            'TRIANGLE': {
                'TYPE': 13,
                'SUB_TYPE': 2
            },
            'DIAMOND': {
                'TYPE': 13,
                'SUB_TYPE': 3
            },
            'STAR': {
                'TYPE': 13,
                'SUB_TYPE': 4
            },
            'CROSS': {
                'TYPE': 13,
                'SUB_TYPE': 5
            },
            'TICK': {
                'TYPE': 13,
                'SUB_TYPE': 6
            },
            'DCROSS': {
                'TYPE': 13,
                'SUB_TYPE': 7
            },                                                            
        }

    };

    return constants;

}();