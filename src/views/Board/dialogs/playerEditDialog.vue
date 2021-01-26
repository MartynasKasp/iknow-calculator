<template>
    <div>
        <md-dialog-prompt
            :md-active.sync="active"
            v-model="points"
            :md-title="title"
            md-input-placeholder="Points"
            md-confirm-text="Save"
            @md-confirm="handleSave"
        />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Get, Sync } from '@/utils/vuex-module-mutators';
import playerModule from '@/modules/Player';

@Component
export default class SettingsPlayerEditDialog extends Vue {
    @Sync(playerModule, 'showPlayerEditDialog') private active!: boolean;

    @Sync(playerModule, 'settingsForm.points') private points!: number;

    @Get(playerModule, 'settingsForm.name') private name!: string;

    get title(): string {
        return `Edit ${this.name}'s points`;
    }

    handleSave() {
        playerModule.updatePlayer();
    }
}
</script>
