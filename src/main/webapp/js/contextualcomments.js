$(document).ready(function() {
    $('#button_add_comment').click(function() {
        if ($('#commentArea').is(':visible')) {
            $('#commentArea').hide();
        } else {
            $('#commentArea').show();
            $('#commentText').focus();
        }
    });
    
    $('form[name="form_commentadd"]').submit(function() {
        return checkComment(this);
    });
    
    function checkComment(form) {
        var formTextField = $(form).find('[name=commenttext]').val();
        if (isBlank(formTextField)) {
            setStatusMessage("Please enter a valid comment. The comment can't be empty.", StatusType.DANGER);
            scrollToTop();
            return false;
        }
    }

    $('#visibility-options-trigger').click(function() {
        if ($('#visibility-options').is(':visible')) {
            $('#visibility-options').hide();
            $('#visibility-options-trigger').html('<span class="glyphicon glyphicon-eye-close"></span> Show Visibility Options');
        } else {
            $('#visibility-options').show();
            $('#visibility-options-trigger').html('<span class="glyphicon glyphicon-eye-close"></span> Hide Visibility Options');
        }
    });

    $('#button_cancel_comment').click(function() {
        $('#commentArea').hide();
    });
    
    $('#comment_recipient_select').change(commentRecipientSelectChangeHandler);
    
    function commentRecipientSelectChangeHandler() {
        // TODO: replace PERSON/TEAM/SECTION etc with constants in common.js
        var selectedValue = $('#comment_recipient_select option:selected').val();
        if (selectedValue === 'PERSON') {
            $('input[name="recipienttype"]').val('PERSON');
            $('input[name="recipients"]').val($('#studentemail > p').text());
            $('#recipient-person').show();
            $('#recipient-team').show();
            $('#recipient-team').find('div[data-toggle="tooltip"]').text('Recipient\'s Team');
            $('#recipient-team').find('input[class="visibilityCheckbox recipientCheckbox"]').prop('disabled', false);
            $('#recipient-section').find('input[class="visibilityCheckbox recipientCheckbox"]').prop('disabled', false);
        } else if (selectedValue === 'TEAM') {
            $('input[name="recipienttype"]').val('TEAM');
            $('input[name="recipients"]').val($('#teamname > p').text());
            $('#recipient-person').hide();
            $('#recipient-team').find('input[class="visibilityCheckbox recipientCheckbox"]').prop('disabled', true);
            $('#recipient-section').find('input[class="visibilityCheckbox recipientCheckbox"]').prop('disabled', false);
            $('#recipient-team').find('div[data-toggle="tooltip"]').text('Recipient Team');
            $('#recipient-team').show();
        } else if (selectedValue === 'SECTION') {
            $('input[name="recipienttype"]').val('SECTION');
            $('input[name="recipients"]').val($('#sectionname > p').text());
            $('#recipient-section').find('input[class="visibilityCheckbox recipientCheckbox"]').prop('disabled', true);
            $('#recipient-person').hide();
            $('#recipient-team').hide();
        }
    }
    
    $("input[type=checkbox]").on("click", visibilityOptionsHandler);
    
    function visibilityOptionsHandler(e) {
        var visibilityOptions = [];
        var target = $(e.target);
        
        if (target.prop("class").includes("answerCheckbox") && !target.prop("checked")) {
            target.parent().parent().find("input[class*=giverCheckbox]").prop("checked", false);
            target.parent().parent().find("input[class*=recipientCheckbox]").prop("checked", false);
        }
        if ((target.prop("class").includes("giverCheckbox") ||
                target.prop("class").includes("recipientCheckbox")) && target.prop("checked")) {
            target.parent().parent().find("input[class*=answerCheckbox]").prop("checked", true);
        }
        
        $('.answerCheckbox:checked').each(function() {
            visibilityOptions.push($(this).val());
        });
        $("input[name='showcommentsto']").val(visibilityOptions.toString());
        
        visibilityOptions = [];
        $('.giverCheckbox:checked').each(function() {
            visibilityOptions.push($(this).val());
        });
        $("input[name='showgiverto']").val(visibilityOptions.toString());
        
        visibilityOptions = [];
        $('.recipientCheckbox:checked').each(function() {
            visibilityOptions.push($(this).val());
        });
        $("input[name='showrecipientto']").val(visibilityOptions.toString());
    }
    
    if (isShowCommentBox) {
        $('#button_add_comment').click();
        if (commentRecipient === "team") {
            $('#comment_recipient_select').val('TEAM');
            commentRecipientSelectChangeHandler();
        } else if (commentRecipient === "section") {
            $('#comment_recipient_select').val('SECTION');
            commentRecipientSelectChangeHandler();
        }
    }
});
