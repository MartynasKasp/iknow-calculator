<template>
    <md-dialog
        :md-active.sync="active"
        class="BugReport__Container"
    >
        <md-dialog-title>Found a problem?</md-dialog-title>

        <md-dialog-content>
            If you found a bug, please report it by sending an email to
            <a :href="emailUrl">bugs@iknowcalculator.online</a>.<br/>
            Please make the description of a bug is as detailed as possible.<br/><br/>

            Thank you for your contribution!
        </md-dialog-content>

        <md-dialog-actions>
            <md-button @click="active = false">Close</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Sync } from '@/utils/vuex-module-mutators';
import gameModule from '@/modules/Game';

@Component
export default class BugReport extends Vue {
    @Sync(gameModule, 'showBugReportDialog') private active!: boolean;

    get emailUrl() {
        return 'mailto:bugs@iknowcalculator.online?subject=Bug%20report';
    }
}
</script>

<style lang="scss" scoped>
    @import './styles.scss';
</style>
