import { defineStore } from "pinia"

const apiBase = import.meta.env.APP_SERVER_URL;

import {Site} from "@/classes/site.class";
import { ref } from "vue";

export const useSitesStore = defineStore("sites", () => {
    let sites = ref<Site[]>([]);
    let currentSite = ref<Site|null>();

    getUserSites().then((resp) => {
        if(!resp.length){
            return;
        }

        resp.forEach((site: Site) => {
            addSite(new Site(site.uri));
        });
    });

    function addSite(site: Site) {
        // if sites already has this site, don't add it again
        if(sites.value.find((s) => s.uri === site.uri)){
            return;
        }

        sites.value.push(site as any);
    }

    function setSite(site: Site) {
        currentSite.value = site;
    }

    async function getUserSites(){
        return fetch(`${apiBase}/sites`, {credentials: "include"}).then((res) => res.json());
    }

    return { sites, addSite, setSite, currentSite };
});

