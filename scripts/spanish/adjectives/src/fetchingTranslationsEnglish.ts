import axios from "axios";
import * as cheerio from 'cheerio';

export async function fetchingTranslationsEnglish(word) {

    console.log("- fetching english translations...")

    try {
        const url = `https://enes.dict.cc/?s=${word.singular_masculine}`
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const scriptContent = $('script:contains("var nres=")').text(); 

        const englishTranslations = scriptContent.match(/var c2Arr = new Array\((.*?)\);/)[1]; 

        const regex = /"(.*?)"/g;
        word.english_translations = englishTranslations.match(regex).map(match => match.slice(1, -1)).slice(1);

        console.log("✅ english translations found \n");
    } catch (error) {
        console.error("Unexpected error:", error.message);
        return
    }
}


/*

<script type="text/javascript">
var nres=4;
var srcStr = "uuuu";
var idArr = new Array(0,2179727,2003790,2222167,2179728);
var c1Arr = new Array("","abandonado","abandonado","abandonado","abandonado");
var c2Arr = new Array("","abandoned","forsaken","neglected","deserted");
var hlRows=true;
var retrDC=true;
window.setTimeout("add_js_extras()", 100);

</script>

*/