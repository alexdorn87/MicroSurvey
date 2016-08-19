'strict';
class SurveyFiltersDirective {
  constructor($compile, $log) {
    'ngInject';
    this.restrict = 'E';
    this.scope = {
      group: '=',
      allow: '='
    };
    this.templateUrl = 'app/components/surveyFilters/surveyFilters.html';
    this.$compile = $compile;
    this.$log = $log;
  }

  compile(element) {
    this.content = element.contents().remove();
  }

  link(scope, element) {
    let directive;
    scope.operators = [
      {name: 'AND'},
      {name: 'OR'}
    ];

    if (scope.allow.indexOf('CONTAINS') >= 0) {
      scope.fields = [
        {name: "Simple match", code: 'SIMPLE'},
        {name: "Exact match", code: 'EXACT'},
        {name: "Starts with", code: 'STARTS'},
        {name: "Ends with", code: 'ENDS'},
        {name: "Contains", code: 'CONTAINS'}
      ];
    } else {
      scope.fields = [
        {name: "Device Type", code: 'DEVICE'},
        {name: "SEO Source", code: 'SOURCE'},
        {name: "IP Address", code: 'IP'},
        {name: "Language Detected", code: 'LANG'},
        {name: "Visitor type: New vs. Returning", code: 'VIS'},
        {name: "Location/Countries", code: 'LOCCON'},
        {name: "Cookie", code: 'COOKIE'}
      ];
    }

    var watcher = scope.$watch('group', function (newVal) {
      if (newVal && newVal.rules.length > 0) {
        watcher();
        for (var i = 0; i < newVal.rules.length; i++) {
          var group = newVal.rules[i];
          if (scope.allow.indexOf('CONTAINS') >= 0 && group.group.rules.length == 2) {
            scope.fields.push({name: "Does not contain", code: 'NOCONTAINS'});
          }
        }
      }
    }, true);


    //if (scope.allow.indexOf('CONTAINS') >= 0 && group.rules.length >= 2) {
    //  scope.fields.push({name: "Does not contain", code: 'NOCONTAINS'});
    //}

    scope.deviceConditions = [{name: 'Desktop'}, {name: 'Mobile'}, {name: 'Tablet'}];
    scope.sourceConditions = [{name: 'SEO'}, {name: 'Paid Search'}, {name: 'Social'}];
    scope.visitorTypes = [{name: 'New'}, {name: 'Returning'}];
    scope.countryNames = [
      {'ccode': 'AF', 'cname': 'Afghanistan'},
      {'ccode': 'AX', 'cname': 'Aland Islands'},
      {'ccode': 'AL', 'cname': 'Albania'},
      {'ccode': 'DZ', 'cname': 'Algeria'},
      {'ccode': 'AS', 'cname': 'American Samoa'},
      {'ccode': 'AD', 'cname': 'Andorra'},
      {'ccode': 'AO', 'cname': 'Angola'},
      {'ccode': 'AI', 'cname': 'Anguilla'},
      {'ccode': 'AQ', 'cname': 'Antarctica'},
      {'ccode': 'AG', 'cname': 'Antigua And Barbuda'},
      {'ccode': 'AR', 'cname': 'Argentina'},
      {'ccode': 'AM', 'cname': 'Armenia'},
      {'ccode': 'AW', 'cname': 'Aruba'},
      {'ccode': 'AU', 'cname': 'Australia'},
      {'ccode': 'AT', 'cname': 'Austria'},
      {'ccode': 'AZ', 'cname': 'Azerbaijan'},
      {'ccode': 'BS', 'cname': 'Bahamas'},
      {'ccode': 'BH', 'cname': 'Bahrain'},
      {'ccode': 'BD', 'cname': 'Bangladesh'},
      {'ccode': 'BB', 'cname': 'Barbados'},
      {'ccode': 'BY', 'cname': 'Belarus'},
      {'ccode': 'BE', 'cname': 'Belgium'},
      {'ccode': 'BZ', 'cname': 'Belize'},
      {'ccode': 'BJ', 'cname': 'Benin'},
      {'ccode': 'BM', 'cname': 'Bermuda'},
      {'ccode': 'BT', 'cname': 'Bhutan'},
      {'ccode': 'BO', 'cname': 'Bolivia'},
      {'ccode': 'BA', 'cname': 'Bosnia And Herzegovina'},
      {'ccode': 'BW', 'cname': 'Botswana'},
      {'ccode': 'BV', 'cname': 'Bouvet Island'},
      {'ccode': 'BR', 'cname': 'Brazil'},
      {'ccode': 'IO', 'cname': 'British Indian Ocean Territory'},
      {'ccode': 'BN', 'cname': 'Brunei Darussalam'},
      {'ccode': 'BG', 'cname': 'Bulgaria'},
      {'ccode': 'BF', 'cname': 'Burkina Faso'},
      {'ccode': 'BI', 'cname': 'Burundi'},
      {'ccode': 'KH', 'cname': 'Cambodia'},
      {'ccode': 'CM', 'cname': 'Cameroon'},
      {'ccode': 'CA', 'cname': 'Canada'},
      {'ccode': 'CV', 'cname': 'Cape Verde'},
      {'ccode': 'KY', 'cname': 'Cayman Islands'},
      {'ccode': 'CF', 'cname': 'Central African Republic'},
      {'ccode': 'TD', 'cname': 'Chad'},
      {'ccode': 'CL', 'cname': 'Chile'},
      {'ccode': 'CN', 'cname': 'China'},
      {'ccode': 'CX', 'cname': 'Christmas Island'},
      {'ccode': 'CC', 'cname': 'Cocos (Keeling) Islands'},
      {'ccode': 'CO', 'cname': 'Colombia'},
      {'ccode': 'KM', 'cname': 'Comoros'},
      {'ccode': 'CG', 'cname': 'Congo'},
      {'ccode': 'CD', 'cname': 'Congo, Democratic Republic'},
      {'ccode': 'CK', 'cname': 'Cook Islands'},
      {'ccode': 'CR', 'cname': 'Costa Rica'},
      {'ccode': 'CI', 'cname': 'Cote D\'Ivoire'},
      {'ccode': 'HR', 'cname': 'Croatia'},
      {'ccode': 'CU', 'cname': 'Cuba'},
      {'ccode': 'CY', 'cname': 'Cyprus'},
      {'ccode': 'CZ', 'cname': 'Czech Republic'},
      {'ccode': 'DK', 'cname': 'Denmark'},
      {'ccode': 'DJ', 'cname': 'Djibouti'},
      {'ccode': 'DM', 'cname': 'Dominica'},
      {'ccode': 'DO', 'cname': 'Dominican Republic'},
      {'ccode': 'EC', 'cname': 'Ecuador'},
      {'ccode': 'EG', 'cname': 'Egypt'},
      {'ccode': 'SV', 'cname': 'El Salvador'},
      {'ccode': 'GQ', 'cname': 'Equatorial Guinea'},
      {'ccode': 'ER', 'cname': 'Eritrea'},
      {'ccode': 'EE', 'cname': 'Estonia'},
      {'ccode': 'ET', 'cname': 'Ethiopia'},
      {'ccode': 'FK', 'cname': 'Falkland Islands (Malvinas)'},
      {'ccode': 'FO', 'cname': 'Faroe Islands'},
      {'ccode': 'FJ', 'cname': 'Fiji'},
      {'ccode': 'FI', 'cname': 'Finland'},
      {'ccode': 'FR', 'cname': 'France'},
      {'ccode': 'GF', 'cname': 'French Guiana'},
      {'ccode': 'PF', 'cname': 'French Polynesia'},
      {'ccode': 'TF', 'cname': 'French Southern Territories'},
      {'ccode': 'GA', 'cname': 'Gabon'},
      {'ccode': 'GM', 'cname': 'Gambia'},
      {'ccode': 'GE', 'cname': 'Georgia'},
      {'ccode': 'DE', 'cname': 'Germany'},
      {'ccode': 'GH', 'cname': 'Ghana'},
      {'ccode': 'GI', 'cname': 'Gibraltar'},
      {'ccode': 'GR', 'cname': 'Greece'},
      {'ccode': 'GL', 'cname': 'Greenland'},
      {'ccode': 'GD', 'cname': 'Grenada'},
      {'ccode': 'GP', 'cname': 'Guadeloupe'},
      {'ccode': 'GU', 'cname': 'Guam'},
      {'ccode': 'GT', 'cname': 'Guatemala'},
      {'ccode': 'GG', 'cname': 'Guernsey'},
      {'ccode': 'GN', 'cname': 'Guinea'},
      {'ccode': 'GW', 'cname': 'Guinea-Bissau'},
      {'ccode': 'GY', 'cname': 'Guyana'},
      {'ccode': 'HT', 'cname': 'Haiti'},
      {'ccode': 'HM', 'cname': 'Heard Island & Mcdonald Islands'},
      {'ccode': 'VA', 'cname': 'Holy See (Vatican City State)'},
      {'ccode': 'HN', 'cname': 'Honduras'},
      {'ccode': 'HK', 'cname': 'Hong Kong'},
      {'ccode': 'HU', 'cname': 'Hungary'},
      {'ccode': 'IS', 'cname': 'Iceland'},
      {'ccode': 'IN', 'cname': 'India'},
      {'ccode': 'ID', 'cname': 'Indonesia'},
      {'ccode': 'IR', 'cname': 'Iran, Islamic Republic Of'},
      {'ccode': 'IQ', 'cname': 'Iraq'},
      {'ccode': 'IE', 'cname': 'Ireland'},
      {'ccode': 'IM', 'cname': 'Isle Of Man'},
      {'ccode': 'IL', 'cname': 'Israel'},
      {'ccode': 'IT', 'cname': 'Italy'},
      {'ccode': 'JM', 'cname': 'Jamaica'},
      {'ccode': 'JP', 'cname': 'Japan'},
      {'ccode': 'JE', 'cname': 'Jersey'},
      {'ccode': 'JO', 'cname': 'Jordan'},
      {'ccode': 'KZ', 'cname': 'Kazakhstan'},
      {'ccode': 'KE', 'cname': 'Kenya'},
      {'ccode': 'KI', 'cname': 'Kiribati'},
      {'ccode': 'KR', 'cname': 'Korea'},
      {'ccode': 'KW', 'cname': 'Kuwait'},
      {'ccode': 'KG', 'cname': 'Kyrgyzstan'},
      {'ccode': 'LA', 'cname': 'Lao People\'s Democratic Republic'},
      {'ccode': 'LV', 'cname': 'Latvia'},
      {'ccode': 'LB', 'cname': 'Lebanon'},
      {'ccode': 'LS', 'cname': 'Lesotho'},
      {'ccode': 'LR', 'cname': 'Liberia'},
      {'ccode': 'LY', 'cname': 'Libyan Arab Jamahiriya'},
      {'ccode': 'LI', 'cname': 'Liechtenstein'},
      {'ccode': 'LT', 'cname': 'Lithuania'},
      {'ccode': 'LU', 'cname': 'Luxembourg'},
      {'ccode': 'MO', 'cname': 'Macao'},
      {'ccode': 'MK', 'cname': 'Macedonia'},
      {'ccode': 'MG', 'cname': 'Madagascar'},
      {'ccode': 'MW', 'cname': 'Malawi'},
      {'ccode': 'MY', 'cname': 'Malaysia'},
      {'ccode': 'MV', 'cname': 'Maldives'},
      {'ccode': 'ML', 'cname': 'Mali'},
      {'ccode': 'MT', 'cname': 'Malta'},
      {'ccode': 'MH', 'cname': 'Marshall Islands'},
      {'ccode': 'MQ', 'cname': 'Martinique'},
      {'ccode': 'MR', 'cname': 'Mauritania'},
      {'ccode': 'MU', 'cname': 'Mauritius'},
      {'ccode': 'YT', 'cname': 'Mayotte'},
      {'ccode': 'MX', 'cname': 'Mexico'},
      {'ccode': 'FM', 'cname': 'Micronesia, Federated States Of'},
      {'ccode': 'MD', 'cname': 'Moldova'},
      {'ccode': 'MC', 'cname': 'Monaco'},
      {'ccode': 'MN', 'cname': 'Mongolia'},
      {'ccode': 'ME', 'cname': 'Montenegro'},
      {'ccode': 'MS', 'cname': 'Montserrat'},
      {'ccode': 'MA', 'cname': 'Morocco'},
      {'ccode': 'MZ', 'cname': 'Mozambique'},
      {'ccode': 'MM', 'cname': 'Myanmar'},
      {'ccode': 'NA', 'cname': 'Namibia'},
      {'ccode': 'NR', 'cname': 'Nauru'},
      {'ccode': 'NP', 'cname': 'Nepal'},
      {'ccode': 'NL', 'cname': 'Netherlands'},
      {'ccode': 'AN', 'cname': 'Netherlands Antilles'},
      {'ccode': 'NC', 'cname': 'New Caledonia'},
      {'ccode': 'NZ', 'cname': 'New Zealand'},
      {'ccode': 'NI', 'cname': 'Nicaragua'},
      {'ccode': 'NE', 'cname': 'Niger'},
      {'ccode': 'NG', 'cname': 'Nigeria'},
      {'ccode': 'NU', 'cname': 'Niue'},
      {'ccode': 'NF', 'cname': 'Norfolk Island'},
      {'ccode': 'MP', 'cname': 'Northern Mariana Islands'},
      {'ccode': 'NO', 'cname': 'Norway'},
      {'ccode': 'OM', 'cname': 'Oman'},
      {'ccode': 'PK', 'cname': 'Pakistan'},
      {'ccode': 'PW', 'cname': 'Palau'},
      {'ccode': 'PS', 'cname': 'Palestinian Territory, Occupied'},
      {'ccode': 'PA', 'cname': 'Panama'},
      {'ccode': 'PG', 'cname': 'Papua New Guinea'},
      {'ccode': 'PY', 'cname': 'Paraguay'},
      {'ccode': 'PE', 'cname': 'Peru'},
      {'ccode': 'PH', 'cname': 'Philippines'},
      {'ccode': 'PN', 'cname': 'Pitcairn'},
      {'ccode': 'PL', 'cname': 'Poland'},
      {'ccode': 'PT', 'cname': 'Portugal'},
      {'ccode': 'PR', 'cname': 'Puerto Rico'},
      {'ccode': 'QA', 'cname': 'Qatar'},
      {'ccode': 'RE', 'cname': 'Reunion'},
      {'ccode': 'RO', 'cname': 'Romania'},
      {'ccode': 'RU', 'cname': 'Russian Federation'},
      {'ccode': 'RW', 'cname': 'Rwanda'},
      {'ccode': 'BL', 'cname': 'Saint Barthelemy'},
      {'ccode': 'SH', 'cname': 'Saint Helena'},
      {'ccode': 'KN', 'cname': 'Saint Kitts And Nevis'},
      {'ccode': 'LC', 'cname': 'Saint Lucia'},
      {'ccode': 'MF', 'cname': 'Saint Martin'},
      {'ccode': 'PM', 'cname': 'Saint Pierre And Miquelon'},
      {'ccode': 'VC', 'cname': 'Saint Vincent And Grenadines'},
      {'ccode': 'WS', 'cname': 'Samoa'},
      {'ccode': 'SM', 'cname': 'San Marino'},
      {'ccode': 'ST', 'cname': 'Sao Tome And Principe'},
      {'ccode': 'SA', 'cname': 'Saudi Arabia'},
      {'ccode': 'SN', 'cname': 'Senegal'},
      {'ccode': 'RS', 'cname': 'Serbia'},
      {'ccode': 'SC', 'cname': 'Seychelles'},
      {'ccode': 'SL', 'cname': 'Sierra Leone'},
      {'ccode': 'SG', 'cname': 'Singapore'},
      {'ccode': 'SK', 'cname': 'Slovakia'},
      {'ccode': 'SI', 'cname': 'Slovenia'},
      {'ccode': 'SB', 'cname': 'Solomon Islands'},
      {'ccode': 'SO', 'cname': 'Somalia'},
      {'ccode': 'ZA', 'cname': 'South Africa'},
      {'ccode': 'GS', 'cname': 'South Georgia And Sandwich Isl.'},
      {'ccode': 'ES', 'cname': 'Spain'},
      {'ccode': 'LK', 'cname': 'Sri Lanka'},
      {'ccode': 'SD', 'cname': 'Sudan'},
      {'ccode': 'SR', 'cname': 'Suriname'},
      {'ccode': 'SJ', 'cname': 'Svalbard And Jan Mayen'},
      {'ccode': 'SZ', 'cname': 'Swaziland'},
      {'ccode': 'SE', 'cname': 'Sweden'},
      {'ccode': 'CH', 'cname': 'Switzerland'},
      {'ccode': 'SY', 'cname': 'Syrian Arab Republic'},
      {'ccode': 'TW', 'cname': 'Taiwan'},
      {'ccode': 'TJ', 'cname': 'Tajikistan'},
      {'ccode': 'TZ', 'cname': 'Tanzania'},
      {'ccode': 'TH', 'cname': 'Thailand'},
      {'ccode': 'TL', 'cname': 'Timor-Leste'},
      {'ccode': 'TG', 'cname': 'Togo'},
      {'ccode': 'TK', 'cname': 'Tokelau'},
      {'ccode': 'TO', 'cname': 'Tonga'},
      {'ccode': 'TT', 'cname': 'Trinidad And Tobago'},
      {'ccode': 'TN', 'cname': 'Tunisia'},
      {'ccode': 'TR', 'cname': 'Turkey'},
      {'ccode': 'TM', 'cname': 'Turkmenistan'},
      {'ccode': 'TC', 'cname': 'Turks And Caicos Islands'},
      {'ccode': 'TV', 'cname': 'Tuvalu'},
      {'ccode': 'UG', 'cname': 'Uganda'},
      {'ccode': 'UA', 'cname': 'Ukraine'},
      {'ccode': 'AE', 'cname': 'United Arab Emirates'},
      {'ccode': 'GB', 'cname': 'United Kingdom'},
      {'ccode': 'US', 'cname': 'United States'},
      {'ccode': 'UM', 'cname': 'United States Outlying Islands'},
      {'ccode': 'UY', 'cname': 'Uruguay'},
      {'ccode': 'UZ', 'cname': 'Uzbekistan'},
      {'ccode': 'VU', 'cname': 'Vanuatu'},
      {'ccode': 'VE', 'cname': 'Venezuela'},
      {'ccode': 'VN', 'cname': 'Viet Nam'},
      {'ccode': 'VG', 'cname': 'Virgin Islands, British'},
      {'ccode': 'VI', 'cname': 'Virgin Islands, U.S.'},
      {'ccode': 'WF', 'cname': 'Wallis And Futuna'},
      {'ccode': 'EH', 'cname': 'Western Sahara'},
      {'ccode': 'YE', 'cname': 'Yemen'},
      {'ccode': 'ZM', 'cname': 'Zambia'},
      {'ccode': 'ZW', 'cname': 'Zimbabwe'}
    ];
    scope.languages = [
      {
        "code": "ab",
        "name": "Abkhaz"
      },
      {
        "code": "aa",
        "name": "Afar"
      },
      {
        "code": "af",
        "name": "Afrikaans"
      },
      {
        "code": "ak",
        "name": "Akan"
      },
      {
        "code": "sq",
        "name": "Albanian"
      },
      {
        "code": "am",
        "name": "Amharic"
      },
      {
        "code": "ar",
        "name": "Arabic"
      },
      {
        "code": "an",
        "name": "Aragonese"
      },
      {
        "code": "hy",
        "name": "Armenian"
      },
      {
        "code": "as",
        "name": "Assamese"
      },
      {
        "code": "av",
        "name": "Avaric"
      },
      {
        "code": "ae",
        "name": "Avestan"
      },
      {
        "code": "ay",
        "name": "Aymara"
      },
      {
        "code": "az",
        "name": "Azerbaijani"
      },
      {
        "code": "bm",
        "name": "Bambara"
      },
      {
        "code": "ba",
        "name": "Bashkir"
      },
      {
        "code": "eu",
        "name": "Basque"
      },
      {
        "code": "be",
        "name": "Belarusian"
      },
      {
        "code": "bn",
        "name": "Bengali; Bangla"
      },
      {
        "code": "bh",
        "name": "Bihari"
      },
      {
        "code": "bi",
        "name": "Bislama"
      },
      {
        "code": "bs",
        "name": "Bosnian"
      },
      {
        "code": "br",
        "name": "Breton"
      },
      {
        "code": "bg",
        "name": "Bulgarian"
      },
      {
        "code": "my",
        "name": "Burmese"
      },
      {
        "code": "ca",
        "name": "Catalan; Valencian"
      },
      {
        "code": "ch",
        "name": "Chamorro"
      },
      {
        "code": "ce",
        "name": "Chechen"
      },
      {
        "code": "ny",
        "name": "Chichewa; Chewa; Nyanja"
      },
      {
        "code": "zh",
        "name": "Chinese"
      },
      {
        "code": "cv",
        "name": "Chuvash"
      },
      {
        "code": "kw",
        "name": "Cornish"
      },
      {
        "code": "co",
        "name": "Corsican"
      },
      {
        "code": "cr",
        "name": "Cree"
      },
      {
        "code": "hr",
        "name": "Croatian"
      },
      {
        "code": "cs",
        "name": "Czech"
      },
      {
        "code": "da",
        "name": "Danish"
      },
      {
        "code": "dv",
        "name": "Divehi; Dhivehi; Maldivian;"
      },
      {
        "code": "nl",
        "name": "Dutch"
      },
      {
        "code": "dz",
        "name": "Dzongkha"
      },
      {
        "code": "en",
        "name": "English"
      },
      {
        "code": "eo",
        "name": "Esperanto"
      },
      {
        "code": "et",
        "name": "Estonian"
      },
      {
        "code": "ee",
        "name": "Ewe"
      },
      {
        "code": "fo",
        "name": "Faroese"
      },
      {
        "code": "fj",
        "name": "Fijian"
      },
      {
        "code": "fi",
        "name": "Finnish"
      },
      {
        "code": "fr",
        "name": "French"
      },
      {
        "code": "ff",
        "name": "Fula; Fulah; Pulaar; Pular"
      },
      {
        "code": "gl",
        "name": "Galician"
      },
      {
        "code": "ka",
        "name": "Georgian"
      },
      {
        "code": "de",
        "name": "German"
      },
      {
        "code": "el",
        "name": "Greek, Modern"
      },
      {
        "code": "gn",
        "name": "GuaranÃ­"
      },
      {
        "code": "gu",
        "name": "Gujarati"
      },
      {
        "code": "ht",
        "name": "Haitian; Haitian Creole"
      },
      {
        "code": "ha",
        "name": "Hausa"
      },
      {
        "code": "he",
        "name": "Hebrew (modern)"
      },
      {
        "code": "hz",
        "name": "Herero"
      },
      {
        "code": "hi",
        "name": "Hindi"
      },
      {
        "code": "ho",
        "name": "Hiri Motu"
      },
      {
        "code": "hu",
        "name": "Hungarian"
      },
      {
        "code": "ia",
        "name": "Interlingua"
      },
      {
        "code": "id",
        "name": "Indonesian"
      },
      {
        "code": "ie",
        "name": "Interlingue"
      },
      {
        "code": "ga",
        "name": "Irish"
      },
      {
        "code": "ig",
        "name": "Igbo"
      },
      {
        "code": "ik",
        "name": "Inupiaq"
      },
      {
        "code": "io",
        "name": "Ido"
      },
      {
        "code": "is",
        "name": "Icelandic"
      },
      {
        "code": "it",
        "name": "Italian"
      },
      {
        "code": "iu",
        "name": "Inuktitut"
      },
      {
        "code": "ja",
        "name": "Japanese"
      },
      {
        "code": "jv",
        "name": "Javanese"
      },
      {
        "code": "kl",
        "name": "Kalaallisut, Greenlandic"
      },
      {
        "code": "kn",
        "name": "Kannada"
      },
      {
        "code": "kr",
        "name": "Kanuri"
      },
      {
        "code": "ks",
        "name": "Kashmiri"
      },
      {
        "code": "kk",
        "name": "Kazakh"
      },
      {
        "code": "km",
        "name": "Khmer"
      },
      {
        "code": "ki",
        "name": "Kikuyu, Gikuyu"
      },
      {
        "code": "rw",
        "name": "Kinyarwanda"
      },
      {
        "code": "ky",
        "name": "Kyrgyz"
      },
      {
        "code": "kv",
        "name": "Komi"
      },
      {
        "code": "kg",
        "name": "Kongo"
      },
      {
        "code": "ko",
        "name": "Korean"
      },
      {
        "code": "ku",
        "name": "Kurdish"
      },
      {
        "code": "kj",
        "name": "Kwanyama, Kuanyama"
      },
      {
        "code": "la",
        "name": "Latin"
      },
      {
        "code": "lb",
        "name": "Luxembourgish, Letzeburgesch"
      },
      {
        "code": "lg",
        "name": "Ganda"
      },
      {
        "code": "li",
        "name": "Limburgish, Limburgan, Limburger"
      },
      {
        "code": "ln",
        "name": "Lingala"
      },
      {
        "code": "lo",
        "name": "Lao"
      },
      {
        "code": "lt",
        "name": "Lithuanian"
      },
      {
        "code": "lu",
        "name": "Luba-Katanga"
      },
      {
        "code": "lv",
        "name": "Latvian"
      },
      {
        "code": "gv",
        "name": "Manx"
      },
      {
        "code": "mk",
        "name": "Macedonian"
      },
      {
        "code": "mg",
        "name": "Malagasy"
      },
      {
        "code": "ms",
        "name": "Malay"
      },
      {
        "code": "ml",
        "name": "Malayalam"
      },
      {
        "code": "mt",
        "name": "Maltese"
      },
      {
        "code": "mi",
        "name": "MÄori"
      },
      {
        "code": "mr",
        "name": "Marathi (MarÄá¹­hÄ«)"
      },
      {
        "code": "mh",
        "name": "Marshallese"
      },
      {
        "code": "mn",
        "name": "Mongolian"
      },
      {
        "code": "na",
        "name": "Nauru"
      },
      {
        "code": "nv",
        "name": "Navajo, Navaho"
      },
      {
        "code": "nb",
        "name": "Norwegian BokmÃ¥l"
      },
      {
        "code": "nd",
        "name": "North Ndebele"
      },
      {
        "code": "ne",
        "name": "Nepali"
      },
      {
        "code": "ng",
        "name": "Ndonga"
      },
      {
        "code": "nn",
        "name": "Norwegian Nynorsk"
      },
      {
        "code": "no",
        "name": "Norwegian"
      },
      {
        "code": "ii",
        "name": "Nuosu"
      },
      {
        "code": "nr",
        "name": "South Ndebele"
      },
      {
        "code": "oc",
        "name": "Occitan"
      },
      {
        "code": "oj",
        "name": "Ojibwe, Ojibwa"
      },
      {
        "code": "cu",
        "name": "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic"
      },
      {
        "code": "om",
        "name": "Oromo"
      },
      {
        "code": "or",
        "name": "Oriya"
      },
      {
        "code": "os",
        "name": "Ossetian, Ossetic"
      },
      {
        "code": "pa",
        "name": "Panjabi, Punjabi"
      },
      {
        "code": "pi",
        "name": "PÄli"
      },
      {
        "code": "fa",
        "name": "Persian (Farsi)"
      },
      {
        "code": "pl",
        "name": "Polish"
      },
      {
        "code": "ps",
        "name": "Pashto, Pushto"
      },
      {
        "code": "pt",
        "name": "Portuguese"
      },
      {
        "code": "qu",
        "name": "Quechua"
      },
      {
        "code": "rm",
        "name": "Romansh"
      },
      {
        "code": "rn",
        "name": "Kirundi"
      },
      {
        "code": "ro",
        "name": "Romanian, [])"
      },
      {
        "code": "ru",
        "name": "Russian"
      },
      {
        "code": "sa",
        "name": "Sanskrit (Saá¹ská¹›ta)"
      },
      {
        "code": "sc",
        "name": "Sardinian"
      },
      {
        "code": "sd",
        "name": "Sindhi"
      },
      {
        "code": "se",
        "name": "Northern Sami"
      },
      {
        "code": "sm",
        "name": "Samoan"
      },
      {
        "code": "sg",
        "name": "Sango"
      },
      {
        "code": "sr",
        "name": "Serbian"
      },
      {
        "code": "gd",
        "name": "Scottish Gaelic; Gaelic"
      },
      {
        "code": "sn",
        "name": "Shona"
      },
      {
        "code": "si",
        "name": "Sinhala, Sinhalese"
      },
      {
        "code": "sk",
        "name": "Slovak"
      },
      {
        "code": "sl",
        "name": "Slovene"
      },
      {
        "code": "so",
        "name": "Somali"
      },
      {
        "code": "st",
        "name": "Southern Sotho"
      },
      {
        "code": "az",
        "name": "South Azerbaijani"
      },
      {
        "code": "es",
        "name": "Spanish; Castilian"
      },
      {
        "code": "su",
        "name": "Sundanese"
      },
      {
        "code": "sw",
        "name": "Swahili"
      },
      {
        "code": "ss",
        "name": "Swati"
      },
      {
        "code": "sv",
        "name": "Swedish"
      },
      {
        "code": "ta",
        "name": "Tamil"
      },
      {
        "code": "te",
        "name": "Telugu"
      },
      {
        "code": "tg",
        "name": "Tajik"
      },
      {
        "code": "th",
        "name": "Thai"
      },
      {
        "code": "ti",
        "name": "Tigrinya"
      },
      {
        "code": "bo",
        "name": "Tibetan Standard, Tibetan, Central"
      },
      {
        "code": "tk",
        "name": "Turkmen"
      },
      {
        "code": "tl",
        "name": "Tagalog"
      },
      {
        "code": "tn",
        "name": "Tswana"
      },
      {
        "code": "to",
        "name": "Tonga (Tonga Islands)"
      },
      {
        "code": "tr",
        "name": "Turkish"
      },
      {
        "code": "ts",
        "name": "Tsonga"
      },
      {
        "code": "tt",
        "name": "Tatar"
      },
      {
        "code": "tw",
        "name": "Twi"
      },
      {
        "code": "ty",
        "name": "Tahitian"
      },
      {
        "code": "ug",
        "name": "Uyghur, Uighur"
      },
      {
        "code": "uk",
        "name": "Ukrainian"
      },
      {
        "code": "ur",
        "name": "Urdu"
      },
      {
        "code": "uz",
        "name": "Uzbek"
      },
      {
        "code": "ve",
        "name": "Venda"
      },
      {
        "code": "vi",
        "name": "Vietnamese"
      },
      {
        "code": "vo",
        "name": "VolapÃ¼k"
      },
      {
        "code": "wa",
        "name": "Walloon"
      },
      {
        "code": "cy",
        "name": "Welsh"
      },
      {
        "code": "wo",
        "name": "Wolof"
      },
      {
        "code": "fy",
        "name": "Western Frisian"
      },
      {
        "code": "xh",
        "name": "Xhosa"
      },
      {
        "code": "yi",
        "name": "Yiddish"
      },
      {
        "code": "yo",
        "name": "Yoruba"
      },
      {
        "code": "za",
        "name": "Zhuang, Chuang"
      },
      {
        "code": "zu",
        "name": "Zulu"
      }
    ];

    scope.addCondition = (group, rule) => {

      rule.status = 'added';

      group.rules = group.rules || [];
      group.rules.forEach(function (rule) {
        rule.status = 'added';
      });
      group.rules.push({
        "field": angular.copy(scope.fields[0]),
        "status": "adding",
        "data": "",
        "filterType": angular.copy(scope.fields[0]).code
      });
      this.$log.debug(group.rules);
      if (scope.allow.indexOf('CONTAINS') >= 0 && group.rules.length == 2) {
        scope.fields.push({name: "Does not contain", code: 'NOCONTAINS'});
      }
    };

    scope.removeCondition = (group, index) => {
      group.rules.splice(index, 1);
    };

    scope.addGroup = (group, groupRule, rule) => {
      groupRule.status = 'added';
      rule.status = 'adding';
      group.rules.push({
        status: 'adding',
        group: {
          rules: [
            {
              "field": angular.copy(scope.fields[0]),
              "status": "adding",
              "data": "",
              "filterType": angular.copy(scope.fields[0]).code
            }
          ]
        }
      });

      if (scope.allow.indexOf('CONTAINS') >= 0 && scope.fields[scope.fields.length - 1].code == 'NOCONTAINS') {
        scope.fields.pop();
      }

    };

    scope.editGroup = (group) => {
      group.status = 'edit';
    };

    scope.updateGroup = (group) => {
      group.status = 'added';
    };

    scope.removeGroup = (group, index) => {
      group.rules.splice(index, 1);
    };

    scope.updateOptions = (item, model, rule) => {
      rule.filterType = item.code;
    };

    scope.getFields = (rules) => {
      if (scope.allow.indexOf('CONTAINS') >= 0 && rules.length == 2) {
        scope.fields.push({name: "Does not contain", code: 'NOCONTAINS'});
      }
      return scope.fields;
    };

    directive || (directive = this.$compile(this.content));
    element.append(directive(scope, ($compile) => {
      return $compile;
    }));
  }
}


export default SurveyFiltersDirective;
